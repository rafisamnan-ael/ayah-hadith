import { apiConfig } from "@/services/api/config";
import { fetchJson } from "@/services/api/http";
import {
  cleanHadithText,
  stripLeadingPunctuation,
} from "@/lib/hadithText";
import type { HadithEntry } from "@/types";

/**
 * Cross-collection hadith word search.
 *
 * The upstream provider has no search endpoint, so a small inverted index of the
 * English + Bangla wording is pre-built at release time (see
 * `scripts/build-hadith-index.mjs`) and shipped as static shards under
 * `/hadith-index`. A query word is looked up in its shard, then the individual
 * narrations are fetched by number (no full collection download).
 */

const INDEX_BASE = "/hadith-index";
const EDITION_PREFIX = { ar: "ara", en: "eng", bn: "ben" } as const;

const STOP = new Set(
  "the and for with that this from they their them was were are his her she him had has have not but you your your our who whom which what when where why how all any both each few more most other some only own same too very will would shall should may might must can could about into over under again further once here there then than now just also said say says upon unto thee thou ye shall".split(
    /\s+/,
  ),
);

export interface HadithIndexCollection {
  id: string;
  name: string;
  nameBn: string;
  nameArabic: string;
}

interface HadithIndexMeta {
  shards: number;
  collections: HadithIndexCollection[];
}

/** Must match `hashToken` in scripts/build-hadith-index.mjs. */
export function hashToken(value: string): number {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function tokenizeQuery(text: string): string[] {
  return Array.from(
    new Set(
      text
        .toLowerCase()
        .replace(/[^a-z0-9\u0980-\u09FF\s]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length >= 3 && !STOP.has(w)),
    ),
  );
}

let metaPromise: Promise<HadithIndexMeta> | null = null;
const shardCache = new Map<string, Promise<Record<string, string[]>>>();
const entryCache = new Map<string, Promise<HadithEntry | null>>();

function loadMeta(): Promise<HadithIndexMeta> {
  if (!metaPromise) {
    metaPromise = fetchJson<HadithIndexMeta>(`${INDEX_BASE}/meta.json`).catch(
      (err) => {
        metaPromise = null;
        throw err;
      },
    );
  }
  return metaPromise;
}

function loadShard(shard: number): Promise<Record<string, string[]>> {
  const key = String(shard);
  let p = shardCache.get(key);
  if (!p) {
    p = fetchJson<Record<string, string[]>>(`${INDEX_BASE}/s-${shard}.json`);
    shardCache.set(key, p);
  }
  return p;
}

interface RawEditionFile {
  metadata?: {
    name?: string;
    section?: Record<string, string>;
    sections?: Record<string, string>;
  };
  hadiths?: Array<{
    hadithnumber: number | string;
    text: string;
    reference?: { book?: number | string };
  }>;
}

async function fetchEdition(
  prefix: keyof typeof EDITION_PREFIX,
  collectionId: string,
  number: string,
): Promise<RawEditionFile | null> {
  try {
    return await fetchJson<RawEditionFile>(
      `${apiConfig.hadithBaseUrl}/editions/${EDITION_PREFIX[prefix]}-${collectionId}/${number}.min.json`,
      { timeoutMs: 15000, retries: 1 },
    );
  } catch {
    return null;
  }
}

function loadEntry(
  collection: HadithIndexCollection,
  number: string,
): Promise<HadithEntry | null> {
  const key = `${collection.id}:${number}`;
  let p = entryCache.get(key);
  if (p) return p;

  p = (async () => {
    const [eng, ben, ara] = await Promise.all([
      fetchEdition("en", collection.id, number),
      fetchEdition("bn", collection.id, number),
      fetchEdition("ar", collection.id, number),
    ]);
    const arabicRaw = ara?.hadiths?.[0]?.text?.trim();
    const englishRaw = eng?.hadiths?.[0]?.text?.trim();
    const banglaRaw = ben?.hadiths?.[0]?.text?.trim();
    // Keep narrations the source has text for in any language; skip empty ones.
    if (!arabicRaw && !englishRaw && !banglaRaw) return null;

    const en = cleanHadithText(englishRaw);
    const bn = cleanHadithText(banglaRaw);
    const alsoIn = Array.from(new Set([...en.alsoIn, ...bn.alsoIn])).filter(
      (id) => id !== collection.id,
    );

    const book =
      eng?.hadiths?.[0]?.reference?.book != null
        ? String(eng.hadiths[0].reference.book)
        : undefined;
    const sections = eng?.metadata?.section ?? eng?.metadata?.sections ?? {};

    return {
      id: `hadith:${collection.id}:${number}`,
      collectionId: collection.id,
      collection: collection.name,
      collectionArabic: collection.nameArabic,
      book,
      chapter: book ? sections[book] : undefined,
      hadithNumber: number,
      arabic: stripLeadingPunctuation(arabicRaw),
      english: en.text,
      bangla: bn.text,
      alsoIn,
    } satisfies HadithEntry;
  })();

  entryCache.set(key, p);
  return p;
}

/**
 * Matches a word (English or Bangla) against every indexed collection.
 * Returns up to `limit` complete narrations.
 */
export async function searchHadithEverywhere(
  query: string,
  limit = 24,
): Promise<HadithEntry[]> {
  const tokens = tokenizeQuery(query);
  if (!tokens.length) return [];

  const meta = await loadMeta();
  const shardIds = Array.from(
    new Set(tokens.map((t) => hashToken(t) % meta.shards)),
  );
  const shardList = await Promise.all(shardIds.map(loadShard));
  const byId = new Map(shardIds.map((id, i) => [id, shardList[i]]));

  const refs = new Set<string>();
  for (const token of tokens) {
    const shard = byId.get(hashToken(token) % meta.shards);
    for (const ref of shard?.[token] ?? []) refs.add(ref);
  }

  // Group by collection, then interleave (round-robin) so the results — and any
  // preview — show a spread of collections rather than all-Bukhari first.
  const byCollection = new Map<number, number[]>();
  for (const ref of refs) {
    const [ci, number] = ref.split(":");
    const key = Number(ci);
    if (!meta.collections[key]) continue;
    const list = byCollection.get(key);
    if (list) list.push(Number(number));
    else byCollection.set(key, [Number(number)]);
  }
  const groups = Array.from(byCollection.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([ci, numbers]) => ({ ci, numbers: numbers.sort((a, b) => a - b) }));

  const ordered: Array<{ ci: number; number: string }> = [];
  for (let round = 0; ordered.length < groups.reduce((n, g) => n + g.numbers.length, 0); round++) {
    let added = false;
    for (const g of groups) {
      if (round < g.numbers.length) {
        ordered.push({ ci: g.ci, number: String(g.numbers[round]) });
        added = true;
      }
    }
    if (!added) break;
  }

  const entries: HadithEntry[] = [];
  const batch = ordered.slice(0, limit * 3);
  const loaded = await Promise.all(
    batch.map((r) => loadEntry(meta.collections[r.ci], r.number)),
  );
  for (const entry of loaded) {
    if (!entry) continue;
    entries.push(entry);
    if (entries.length >= limit) break;
  }
  return entries;
}
