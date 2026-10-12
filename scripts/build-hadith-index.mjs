/**
 * Builds the cross-collection hadith search index.
 *
 * The free hadith source (fawazahmed0/hadith-api) only serves whole-collection
 * files and has no search endpoint, so we pre-compute a small inverted index of
 * the English + Bangla wording and ship it as static shards. The app looks a
 * query word up in the matching shard, then pulls the individual narrations.
 *
 * Output: public/hadith-index/s-<0..SHARDS-1>.json + meta.json
 *
 * Run with:  node scripts/build-hadith-index.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public", "hadith-index");
const CACHE = path.join(ROOT, ".cache", "hadith-src");
const BASE = "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/";

/** Collections that carry both English and Bangla editions. */
const COLLECTIONS = [
  { id: "bukhari", bn: "সহিহ বুখারি", ar: "صحيح البخاري" },
  { id: "muslim", bn: "সহিহ মুসলিম", ar: "صحيح مسلم" },
  { id: "abudawud", bn: "সুনান আবু দাউদ", ar: "سنن أبي داود" },
  { id: "tirmidhi", bn: "জামে' আত-তিরমিজি", ar: "جامع الترمذي" },
  { id: "nasai", bn: "সুনান আন-নাসাই", ar: "سنن النسائي" },
  { id: "ibnmajah", bn: "সুনান ইবনে মাজাহ", ar: "سنن ابن ماجه" },
  { id: "malik", bn: "মুয়াত্তা মালিক", ar: "موطأ مالك" },
  { id: "nawawi", bn: "আল-আরবাইন আন-নববী", ar: "الأربعون النووية" },
];

const SHARDS = 64;
/** Keep at most this many narrations per collection, per word, so every
 *  collection is represented (a global cap would fill with the first one). */
const CAP = 24;

const STOP = new Set(
  (
    "the and for with that this from they their them was were are his her she him had has have not but you your our who whom which what when where why how all any both each few more most other some only own same too very will would shall should may might must can could about into over under again further once here there then than now just also said say says upon unto thee thou ye shall"
  ).split(/\s+/),
);

export function hashToken(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u0980-\u09FF\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 3 && !STOP.has(w));
}

async function load(edition, id) {
  fs.mkdirSync(CACHE, { recursive: true });
  const file = path.join(CACHE, `${edition}-${id}.json`);
  if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, "utf8"));
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const r = await fetch(`${BASE}${edition}-${id}.min.json`);
      if (!r.ok) throw new Error("HTTP " + r.status);
      const text = await r.text();
      fs.writeFileSync(file, text);
      return JSON.parse(text);
    } catch (e) {
      if (attempt === 3) throw e;
      await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
    }
  }
}

const words = new Map(); // token -> Map(ci -> number[])
const collections = [];

for (let ci = 0; ci < COLLECTIONS.length; ci++) {
  const c = COLLECTIONS[ci];
  const [eng, ben] = await Promise.all([load("eng", c.id), load("ben", c.id)]);
  collections.push({ id: c.id, name: eng.metadata.name, nameBn: c.bn, nameArabic: c.ar });
  const seen = new Set();
  for (const src of [eng, ben]) {
    for (const h of src.hadiths ?? []) {
      const num = String(h.hadithnumber);
      for (const token of new Set(tokenize(h.text ?? ""))) {
        let per = words.get(token);
        if (!per) words.set(token, (per = new Map()));
        let nums = per.get(ci);
        if (!nums) per.set(ci, (nums = []));
        if (nums.length < CAP && !nums.includes(num)) nums.push(num);
      }
      seen.add(num);
    }
  }
  process.stdout.write(`indexed ${c.id}: ${seen.size} narrations\n`);
}

const shards = Array.from({ length: SHARDS }, () => ({}));
for (const [token, per] of words) {
  const refs = [];
  for (const [ci, nums] of per) for (const n of nums) refs.push(`${ci}:${n}`);
  shards[hashToken(token) % SHARDS][token] = refs;
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
let total = 0;
for (let i = 0; i < SHARDS; i++) {
  const json = JSON.stringify(shards[i]);
  total += json.length;
  fs.writeFileSync(path.join(OUT, `s-${i}.json`), json);
}
fs.writeFileSync(
  path.join(OUT, "meta.json"),
  JSON.stringify({ shards: SHARDS, cap: CAP, collections }, null, 1),
);

console.log(
  `words: ${words.size} · shards: ${SHARDS} · index ~${(total / 1048576).toFixed(1)} MB → ${OUT}`,
);
