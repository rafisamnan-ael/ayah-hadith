import { collectionNameBn } from "@/data/collectionNamesBn";

/**
 * The Bangla/English hadith editions carry print-edition artefacts: a leading
 * دanda/full stop ("। text…"), trailing footnotes ("[1] সহীহ: মুসলিম।") and
 * trailing citation brackets with print numbers. Those aren't part of the
 * narration, so we trim them for display and surface any *other* collection the
 * narration is found in as a proper reference ("Sunan Abu Dawud · Sahih Muslim").
 */

export const COLLECTION_NAMES_EN: Record<string, string> = {
  bukhari: "Sahih al Bukhari",
  muslim: "Sahih Muslim",
  abudawud: "Sunan Abu Dawud",
  tirmidhi: "Jami' at-Tirmidhi",
  nasai: "Sunan an-Nasa'i",
  ibnmajah: "Sunan Ibn Majah",
  malik: "Muwatta Malik",
  nawawi: "Forty Hadith of an-Nawawi",
};

const ALIASES: Array<{ id: string; patterns: string[] }> = [
  { id: "bukhari", patterns: ["বুখারী", "বুখারি", "Bukhari"] },
  { id: "muslim", patterns: ["মুসলিম", "Muslim"] },
  {
    id: "abudawud",
    patterns: ["আবূ দাউদ", "আবু দাউদ", "আবূ দাঊদ", "Abu Dawud", "Abu-Dawud"],
  },
  { id: "tirmidhi", patterns: ["তিরমিযী", "তিরমিজি", "Tirmidhi"] },
  { id: "nasai", patterns: ["নাসাঈ", "নাসায়ী", "Nasai", "Nas’ai"] },
  { id: "ibnmajah", patterns: ["ইবনে মাজাহ", "Ibn Majah", "Ibn-Majah"] },
];

/** Leading punctuation/whitespace artefacts (danda, dots, stray brackets). */
const LEADING = /^[\s।.,;:)\]}]+\s*/;

function collect(text: string, into: Set<string>): void {
  for (const alias of ALIASES) {
    if (alias.patterns.some((p) => text.includes(p))) into.add(alias.id);
  }
}

export interface CleanedHadithText {
  text?: string;
  alsoIn: string[];
}

/** Trims edition artefacts and reports any other collections referenced. */
export function cleanHadithText(raw?: string): CleanedHadithText {
  if (!raw) return { text: raw, alsoIn: [] };
  let t = raw.replace(/\s+/g, " ").trim();
  const alsoIn = new Set<string>();

  // Trailing footnote marker: "[1] সহীহ: মুসলিম।" (only when it's citation-sized).
  const fn = t.match(/\[\d+\]([^[]*)$/);
  if (fn && fn.index !== undefined && fn[0].length <= 160) {
    collect(fn[0], alsoIn);
    t = t.slice(0, fn.index).trim();
  }

  // Trailing citation brackets: "(৭৪৩০) (ইসলামিক ফাউন্ডেশনঃ)".
  for (let i = 0; i < 3; i++) {
    const m = t.match(/\s*\(([^()]*)\)\s*$/);
    if (!m || m.index === undefined) break;
    const inner = m[1];
    if (inner.length > 220 || !/[0-9\u09E6-\u09EF]/.test(inner)) break;
    collect(inner, alsoIn);
    t = t.slice(0, m.index).trim();
  }

  t = t.replace(LEADING, "").trim();
  return { text: t || undefined, alsoIn: Array.from(alsoIn) };
}

/** Removes a leading danda/dot from Arabic/any text without touching the body. */
export function stripLeadingPunctuation(raw?: string): string | undefined {
  if (!raw) return raw;
  const t = raw.replace(LEADING, "").trim();
  return t || undefined;
}

export function alsoInNames(
  ids: string[] | undefined,
  language: "en" | "bn",
): string[] {
  if (!ids?.length) return [];
  return ids.map(
    (id) =>
      (language === "bn" ? collectionNameBn(id) : COLLECTION_NAMES_EN[id]) ?? id,
  );
}
