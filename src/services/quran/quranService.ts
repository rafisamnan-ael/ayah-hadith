import { apiConfig, QURAN_EDITIONS } from "@/services/api/config";
import { fetchJson } from "@/services/api/http";
import { getTranslationOverride } from "@/data/translationOverrides";
import { repairBanglaArtifacts } from "@/lib/quranText";
import type { QuranVerse, ReligiousContent, SurahSummary } from "@/types";

/* ----------------------------- raw API shapes ----------------------------- */

interface RawSurah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface RawEdition {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
}

interface RawAyah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  surah?: RawSurah;
}

interface RawEditionData extends Partial<RawSurah> {
  ayahs: RawAyah[];
  edition: RawEdition;
}

interface RawEnvelope<T> {
  code: number;
  status: string;
  data: T;
}

interface RawSearchData {
  count: number;
  matches: Array<{
    number: number;
    text: string;
    numberInSurah: number;
    surah: RawSurah;
    edition: RawEdition;
  }>;
}

/* -------------------------------- helpers -------------------------------- */

const editionsParam = [
  QURAN_EDITIONS.arabic,
  QURAN_EDITIONS.english,
  QURAN_EDITIONS.bangla,
].join(",");

/**
 * The Uthmani edition prefixes the Basmala to the first ayah of every surah
 * except Al-Fatiha (where it *is* ayah 1) and At-Tawbah. The Basmala is not an
 * ayah, so we strip it from the ayah text and surface it separately.
 * Built from code points to avoid any transcription error.
 */
const BASMALA = String.fromCharCode(
  0x0628, 0x0650, 0x0633, 0x0652, 0x0645, 0x0650, 0x0020, 0x0671, 0x0644, 0x0644,
  0x0651, 0x064e, 0x0647, 0x0650, 0x0020, 0x0671, 0x0644, 0x0631, 0x0651, 0x064e,
  0x062d, 0x0652, 0x0645, 0x064e, 0x0670, 0x0646, 0x0650, 0x0020, 0x0671, 0x0644,
  0x0631, 0x0651, 0x064e, 0x062d, 0x0650, 0x064a, 0x0645, 0x0650,
);

export { BASMALA };

/** Removes a leading Basmala (with optional trailing space) from the text. */
function stripLeadingBasmala(text: string): { text: string; stripped: boolean } {
  const clean = text.replace(/^\uFEFF/, "");
  if (clean.startsWith(BASMALA)) {
    return { text: clean.slice(BASMALA.length).replace(/^\s+/, ""), stripped: true };
  }
  // Diacritic-insensitive fallback.
  const norm = (s: string) =>
    s.replace(/[\u064B-\u0652\u0670\u0640\u06D6-\u06ED]/g, "");
  if (norm(clean).startsWith(norm(BASMALA))) {
    const target = norm(BASMALA).length;
    let count = 0;
    let i = 0;
    while (i < clean.length && count < target) {
      if (!/[\u064B-\u0652\u0670\u0640\u06D6-\u06ED]/.test(clean[i])) count++;
      i++;
    }
    return { text: clean.slice(i).replace(/^\s+/, ""), stripped: true };
  }
  return { text: clean, stripped: false };
}

/** Strips the Basmala from ayah 1 (except Al-Fatiha and At-Tawbah). */
function cleanArabic(surahNumber: number, verseNumber: number, text: string): string {
  if (!text) return text;
  if (surahNumber !== 1 && verseNumber === 1) {
    return stripLeadingBasmala(text).text.trim();
  }
  return text.replace(/^\uFEFF/, "").trim();
}

function hasBasmalaPrefix(text: string | undefined): boolean {
  if (!text) return false;
  return stripLeadingBasmala(text).stripped;
}

function toSurahSummary(raw: RawSurah): SurahSummary {
  return {
    number: raw.number,
    name: raw.name,
    englishName: raw.englishName,
    englishNameTranslation: raw.englishNameTranslation,
    numberOfAyahs: raw.numberOfAyahs,
    revelationType: raw.revelationType,
  };
}

function verseFromAyahs(
  arabic: RawAyah | undefined,
  english: RawAyah | undefined,
  bangla: RawAyah | undefined,
  surah: { number: number; name: string; englishName: string },
): QuranVerse | null {
  const ref = arabic ?? english ?? bangla;
  if (!ref) return null;
  return withOverride({
    id: `quran:${surah.number}:${ref.numberInSurah}`,
    surahNumber: surah.number,
    surahName: surah.name,
    surahNameEnglish: surah.englishName,
    verseNumber: ref.numberInSurah,
    juz: ref.juz,
    arabic: cleanArabic(surah.number, ref.numberInSurah, arabic?.text ?? ""),
    english: english?.text,
    bangla: repairBanglaArtifacts(bangla?.text),
  });
}

function indexByVerse(ayahs: RawAyah[] | undefined): Map<number, RawAyah> {
  const map = new Map<number, RawAyah>();
  for (const a of ayahs ?? []) map.set(a.numberInSurah, a);
  return map;
}

/** Applies a curated translation override (if any). Arabic is never modified. */
function withOverride(verse: QuranVerse): QuranVerse {
  const override = getTranslationOverride(verse.surahNumber, verse.verseNumber);
  if (!override) return verse;
  return {
    ...verse,
    english: override.en ?? verse.english,
    bangla: override.bn ?? verse.bangla,
  };
}

/* ------------------------------- public API ------------------------------- */

const SEARCH_LIMIT = 24;

/** Fetches full (Arabic + English + Bangla) data for a set of verses. */
async function enrichVerses(
  verses: QuranVerse[],
  signal?: AbortSignal,
): Promise<QuranVerse[]> {
  const limited = verses.slice(0, SEARCH_LIMIT);
  const full = await Promise.all(
    limited.map((v) =>
      quranService
        .getAyah(v.surahNumber, v.verseNumber, signal)
        .catch(() => null),
    ),
  );
  const ok = full.filter((v): v is QuranVerse => Boolean(v));
  return sortByQuranOrder(ok.length ? ok : limited);
}

export const quranService = {
  async listSurahs(signal?: AbortSignal): Promise<SurahSummary[]> {
    const res = await fetchJson<RawEnvelope<RawSurah[]>>(
      `${apiConfig.quranBaseUrl}/surah`,
      { signal },
    );
    return (res.data ?? []).map(toSurahSummary);
  },

  async getSurah(
    surahNumber: number,
    signal?: AbortSignal,
  ): Promise<{ surah: SurahSummary; verses: QuranVerse[]; basmala?: string }> {
    const res = await fetchJson<RawEnvelope<RawEditionData[]>>(
      `${apiConfig.quranBaseUrl}/surah/${surahNumber}/editions/${editionsParam}`,
      { signal },
    );

    const [arabic, english, bangla] = res.data;
    const ar = indexByVerse(arabic?.ayahs);
    const en = indexByVerse(english?.ayahs);
    const bn = indexByVerse(bangla?.ayahs);
    const numbers = Array.from(ar.keys()).sort((a, b) => a - b);

    const surah = toSurahSummary(
      (arabic ?? english ?? bangla) as unknown as RawSurah,
    );

    const verses = numbers
      .map((n) => verseFromAyahs(ar.get(n), en.get(n), bn.get(n), surah))
      .filter((v): v is QuranVerse => Boolean(v));

    // Surface the Basmala as a header (not an ayah) for surahs that carry it.
    const basmala =
      surahNumber !== 1 && surahNumber !== 9 && hasBasmalaPrefix(ar.get(1)?.text)
        ? BASMALA
        : undefined;

    return { surah, verses, basmala };
  },

  async getJuz(
    juz: number,
    signal?: AbortSignal,
  ): Promise<QuranVerse[]> {
    const res = await fetchJson<RawEnvelope<RawEditionData[]>>(
      `${apiConfig.quranBaseUrl}/juz/${juz}/editions/${editionsParam}`,
      { signal },
    );
    const [arabic, english, bangla] = res.data;
    const ar = indexByVerse(arabic?.ayahs);
    const en = indexByVerse(english?.ayahs);
    const bn = indexByVerse(bangla?.ayahs);

    // Juz ayahs carry their surah metadata on each ayah.
    const verses: QuranVerse[] = [];
    const seen = new Set<string>();
    for (const a of arabic?.ayahs ?? []) {
      const raw = a as RawAyah & { surah?: RawSurah };
      const s = raw.surah;
      if (!s) continue;
      const key = `${s.number}:${a.numberInSurah}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const verse = verseFromAyahs(
        ar.get(a.numberInSurah) ?? a,
        en.get(a.numberInSurah),
        bn.get(a.numberInSurah),
        { number: s.number, name: s.name, englishName: s.englishName },
      );
      if (verse) verses.push(verse);
    }
    return verses;
  },

  /** Raw keyword matches (single edition) — enriched by `search`/`searchMany`. */
  async searchRaw(
    keyword: string,
    language: "en" | "bn",
    signal?: AbortSignal,
  ): Promise<QuranVerse[]> {
    const term = keyword.trim();
    if (!term) return [];
    const edition =
      language === "bn" ? QURAN_EDITIONS.bangla : QURAN_EDITIONS.english;
    const res = await fetchJson<RawEnvelope<RawSearchData>>(
      `${apiConfig.quranBaseUrl}/search/${encodeURIComponent(term)}/all/${edition}`,
      { signal },
    );
    return (res.data?.matches ?? []).map((m) =>
      withOverride({
        id: `quran:${m.surah.number}:${m.numberInSurah}`,
        surahNumber: m.surah.number,
        surahName: m.surah.name,
        surahNameEnglish: m.surah.englishName,
        verseNumber: m.numberInSurah,
        juz: 0,
        arabic: "",
        english: language === "en" ? m.text : undefined,
        bangla: language === "bn" ? repairBanglaArtifacts(m.text) : undefined,
      }),
    );
  },

  /** Keyword search with Arabic + English + Bangla filled in for every result. */
  async search(
    keyword: string,
    language: "en" | "bn",
    signal?: AbortSignal,
  ): Promise<QuranVerse[]> {
    const matches = await quranService.searchRaw(keyword, language, signal);
    return enrichVerses(matches, signal);
  },

  /** Runs several keyword searches and merges unique results, in Qur'an order. */
  async searchMany(
    keywords: string[],
    language: "en" | "bn",
    signal?: AbortSignal,
    limit = 3,
  ): Promise<QuranVerse[]> {
    const terms = Array.from(
      new Set(keywords.map((k) => k.trim()).filter(Boolean)),
    ).slice(0, limit);
    const lists = await Promise.all(
      terms.map((term) =>
        quranService.searchRaw(term, language, signal).catch(() => []),
      ),
    );
    const seen = new Map<string, QuranVerse>();
    for (const list of lists) {
      for (const verse of list) if (!seen.has(verse.id)) seen.set(verse.id, verse);
    }
    return enrichVerses(sortByQuranOrder(Array.from(seen.values())), signal);
  },

  /** Fetches one specific verse (all editions), e.g. a curated reference. */
  async getAyah(
    surahNumber: number,
    verseNumber: number,
    signal?: AbortSignal,
  ): Promise<QuranVerse | null> {
    const res = await fetchJson<
      RawEnvelope<Array<RawAyah & { surah?: RawSurah }>>
    >(
      `${apiConfig.quranBaseUrl}/ayah/${surahNumber}:${verseNumber}/editions/${editionsParam}`,
      { signal },
    );
    const [arabic, english, bangla] = res.data;
    const ref = arabic ?? english ?? bangla;
    if (!ref) return null;
    const s = ref.surah;
    return withOverride({
      id: `quran:${surahNumber}:${verseNumber}`,
      surahNumber,
      surahName: s?.name ?? "",
      surahNameEnglish: s?.englishName ?? "",
      verseNumber,
      juz: ref.juz ?? 0,
      arabic: cleanArabic(surahNumber, verseNumber, arabic?.text ?? ""),
      english: english?.text,
      bangla: repairBanglaArtifacts(bangla?.text),
    });
  },
};

/* --------------------------- normalization to card -------------------------- */

/** Sorts verses into Qur'an order (surah, then ayah) without gaps or reordering. */
export function sortByQuranOrder(verses: QuranVerse[]): QuranVerse[] {
  return [...verses].sort(
    (a, b) => a.surahNumber - b.surahNumber || a.verseNumber - b.verseNumber,
  );
}

export function verseToContent(verse: QuranVerse): ReligiousContent {
  return {
    id: verse.id,
    type: "quran",
    arabic: verse.arabic || undefined,
    english: verse.english || undefined,
    bangla: verse.bangla || undefined,
    surahName: verse.surahName,
    surahNameEnglish: verse.surahNameEnglish,
    surahNumber: verse.surahNumber,
    verseNumber: verse.verseNumber,
    juz: verse.juz || undefined,
  };
}
