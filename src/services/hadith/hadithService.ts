import { apiConfig } from "@/services/api/config";
import { fetchJson } from "@/services/api/http";
import { readCache, writeCache } from "@/lib/cache";
import { fetchMuslimSupplement } from "@/services/hadith/muslimSupplement";
import {
  cleanHadithText,
  stripLeadingPunctuation,
} from "@/lib/hadithText";
import { COLLECTION_NAMES_BN, collectionNameBn } from "@/data/collectionNamesBn";
import type {
  HadithCollectionData,
  HadithCollectionSummary,
  HadithEntry,
  ReligiousContent,
} from "@/types";

/* ----------------------------- raw API shapes ----------------------------- */

interface RawEditionRef {
  name: string;
  book: string;
  author: string;
  language: string;
  has_sections: boolean;
  direction: "rtl" | "ltr";
}

type RawEditionsIndex = Record<
  string,
  { name: string; collection: RawEditionRef[] }
>;

interface RawGrade {
  name?: string;
  grade?: string;
}

interface RawHadith {
  hadithnumber: number | string;
  arabicnumber?: number | string;
  text: string;
  grades?: RawGrade[];
  reference?: { book: number | string; hadith: number | string };
}

interface RawEditionFile {
  metadata: {
    name: string;
    sections?: Record<string, string>;
    section?: Record<string, string>;
    section_details?: Record<string, unknown>;
  };
  hadiths: RawHadith[];
}

/* ------------------------------- reference -------------------------------- */

/** Bibliographic titles (not scripture) for display. */
const COLLECTION_ARABIC: Record<string, string> = {
  bukhari: "صحيح البخاري",
  muslim: "صحيح مسلم",
  abudawud: "سنن أبي داود",
  tirmidhi: "جامع الترمذي",
  nasai: "سنن النسائي",
  ibnmajah: "سنن ابن ماجه",
  malik: "موطأ مالك",
  nawawi: "الأربعون النووية",
  qudsi: "الأحاديث القدسية",
  dehlawi: "حجة الله البالغة",
};

/** Bengali collection titles (bibliographic, supplied by us). */
const COLLECTION_BANGLA = COLLECTION_NAMES_BN;

const PREFERRED_ORDER = [
  "bukhari",
  "muslim",
  "abudawud",
  "tirmidhi",
  "nasai",
  "ibnmajah",
  "malik",
  "nawawi",
  "qudsi",
  "dehlawi",
];

/** Provider edition filename prefixes (fawazahmed0/hadith-api). */
const EDITION_PREFIX: Record<"ar" | "en" | "bn", string> = {
  ar: "ara",
  en: "eng",
  bn: "ben",
};

/* -------------------------------- helpers -------------------------------- */

function normalizeLanguage(language: string): "ar" | "en" | "bn" | null {
  const l = language.toLowerCase();
  if (l.startsWith("arab")) return "ar";
  if (l.startsWith("engl")) return "en";
  if (l.startsWith("beng")) return "bn";
  return null;
}

function gradeOf(grades?: RawGrade[]): string | undefined {
  if (!grades || grades.length === 0) return undefined;
  const g = grades[0];
  return (typeof g.grade === "string" && g.grade) || g.name || undefined;
}

/** Trims text and treats blank strings as missing (some editions have gaps). */
function clean(text?: string): string | undefined {
  const s = text?.trim();
  return s ? s : undefined;
}

function nonEmptyCount(file: RawEditionFile): number {
  return file.hadiths.reduce((n, h) => (clean(h.text) ? n + 1 : n), 0);
}

/** Indexes an edition's narrations by hadith number. */
function indexByNumber(hadiths: RawHadith[] | undefined): Map<string, string | undefined> {
  const map = new Map<string, string | undefined>();
  for (const h of hadiths ?? []) map.set(String(h.hadithnumber), clean(h.text));
  return map;
}

function toEntries(
  primary: RawEditionFile,
  other: RawEditionFile | undefined,
  arabic: RawEditionFile | undefined,
  collectionId: string,
  collectionName: string,
  primaryLang: "en" | "bn",
  supplement?: Map<string, { ar?: string; bn?: string }>,
): HadithEntry[] {
  const arabicByNumber = new Map<string, string>();
  for (const h of arabic?.hadiths ?? []) {
    arabicByNumber.set(String(h.hadithnumber), h.text);
  }
  const otherByNumber = new Map<string, string | undefined>();
  for (const h of other?.hadiths ?? []) {
    otherByNumber.set(String(h.hadithnumber), clean(h.text));
  }
  const sections = primary.metadata.sections ?? primary.metadata.section ?? {};

  return primary.hadiths
    .map((h): HadithEntry | null => {
      const num = String(h.hadithnumber);
      const book = h.reference?.book != null ? String(h.reference.book) : undefined;
      const primaryText = clean(h.text);
      const otherText = otherByNumber.get(num);
      const sup = supplement?.get(num);
      // Supplement (Sahih Muslim gaps) fills in Arabic / Bangla the provider omits.
      const arabicText = clean(arabicByNumber.get(num)) ?? sup?.ar;
      const enRaw = primaryLang === "en" ? primaryText : otherText;
      const bnRaw = (primaryLang === "bn" ? primaryText : otherText) || sup?.bn;

      // Keep every narration the source actually has text for (in any of the
      // three languages); only skip entries that are completely empty even
      // after the supplement.
      if (!arabicText && !enRaw && !bnRaw) return null;

      // Trim print-edition artefacts (leading danda, trailing footnotes) and
      // note any other collection the citation points to.
      const en = cleanHadithText(enRaw);
      const bn = cleanHadithText(bnRaw);
      const alsoIn = Array.from(new Set([...en.alsoIn, ...bn.alsoIn])).filter(
        (id) => id !== collectionId,
      );

      return {
        id: `hadith:${collectionId}:${num}`,
        collectionId,
        collection: collectionName,
        collectionArabic: COLLECTION_ARABIC[collectionId],
        book,
        chapter: book ? sections[book] || undefined : undefined,
        hadithNumber: num,
        arabic: stripLeadingPunctuation(arabicText),
        english: en.text,
        bangla: bn.text,
        grade: gradeOf(h.grades),
        alsoIn,
      };
    })
    .filter((e): e is HadithEntry => e !== null)
    // Always present narrations in ascending hadith-number order (1, 2, 3 …).
    .sort((a, b) => {
      const an = Number(a.hadithNumber);
      const bn = Number(b.hadithNumber);
      if (Number.isFinite(an) && Number.isFinite(bn)) return an - bn;
      return a.hadithNumber.localeCompare(b.hadithNumber);
    });
}

/* ------------------------------- public API ------------------------------- */

export const hadithService = {
  async listCollections(signal?: AbortSignal): Promise<HadithCollectionSummary[]> {
    const index = await fetchJson<RawEditionsIndex>(
      `${apiConfig.hadithBaseUrl}/editions.json`,
      { signal, timeoutMs: 25000 },
    );

    const summaries: HadithCollectionSummary[] = [];
    for (const [id, value] of Object.entries(index)) {
      const langs = new Set(
        (value.collection ?? [])
          .map((e) => normalizeLanguage(e.language))
          .filter((x): x is "ar" | "en" | "bn" => Boolean(x)),
      );
      const translationLanguages: Array<"en" | "bn"> = [];
      if (langs.has("en")) translationLanguages.push("en");
      if (langs.has("bn")) translationLanguages.push("bn");
      if (translationLanguages.length === 0) continue;

      summaries.push({
        id,
        name: value.name,
        nameArabic: COLLECTION_ARABIC[id],
        nameBn: COLLECTION_BANGLA[id],
        availableLanguages: Array.from(langs),
        translationLanguages,
      });
    }

    summaries.sort((a, b) => {
      const ai = PREFERRED_ORDER.indexOf(a.id);
      const bi = PREFERRED_ORDER.indexOf(b.id);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    });

    return summaries;
  },

  async getCollection(
    collectionId: string,
    translationLanguage: "en" | "bn",
    signal?: AbortSignal,
  ): Promise<HadithCollectionData> {
    const cacheKey = `hadith:v4:${collectionId}:${translationLanguage}`;
    let langPrefix = EDITION_PREFIX[translationLanguage];

    try {
      const files = await Promise.all([
        fetchJson<RawEditionFile>(
          `${apiConfig.hadithBaseUrl}/editions/${langPrefix}-${collectionId}.min.json`,
          { signal, timeoutMs: 30000 },
        ),
        fetchJson<RawEditionFile>(
          `${apiConfig.hadithBaseUrl}/editions/${EDITION_PREFIX.ar}-${collectionId}.min.json`,
          { signal, timeoutMs: 30000 },
        ).catch(() => undefined),
      ]);
      let translation = files[0];
      const arabic = files[1];

      // Always load the other translation too, so every narration carries both
      // English and Bangla (individual editions have gaps). This keeps reading
      // pages and photocards filled in either language.
      let usedLang = translationLanguage;
      const other: "en" | "bn" = translationLanguage === "en" ? "bn" : "en";
      let otherFile = await fetchJson<RawEditionFile>(
        `${apiConfig.hadithBaseUrl}/editions/${EDITION_PREFIX[other]}-${collectionId}.min.json`,
        { signal, timeoutMs: 30000 },
      ).catch(() => undefined);

      // If the requested edition is effectively empty, make the other primary.
      const coverage = translation.hadiths.length
        ? nonEmptyCount(translation) / translation.hadiths.length
        : 0;
      if (coverage < 0.05 && otherFile && nonEmptyCount(otherFile) > 0) {
        translation = otherFile;
        otherFile = undefined;
        langPrefix = EDITION_PREFIX[other];
        usedLang = other;
      }

      const sections =
        translation.metadata.sections ?? translation.metadata.section ?? {};
      const langs: Array<"ar" | "en" | "bn"> = arabic
        ? ["ar", usedLang]
        : [usedLang];
      if (otherFile) langs.push(usedLang === "en" ? "bn" : "en");

      // Sahih Muslim only: the provider ships its Introduction (hadiths 1–92)
      // and a few other narrations with no text. Fetch just those from the
      // supplementary Bangla source so the book starts at hadith 1.
      let supplement: Map<string, { ar?: string; bn?: string }> | undefined;
      if (collectionId === "muslim") {
        const bnSource = usedLang === "bn" ? translation : otherFile;
        if (bnSource && arabic) {
          const arabicByNumber = indexByNumber(arabic.hadiths);
          const banglaByNumber = indexByNumber(bnSource.hadiths);
          const missing = translation.hadiths
            .map((h) => String(h.hadithnumber))
            .filter(
              (num) => !clean(arabicByNumber.get(num)) || !clean(banglaByNumber.get(num)),
            );
          if (missing.length) {
            supplement = await fetchMuslimSupplement(missing, signal);
          }
        }
      }

      const data: HadithCollectionData = {
        collection: {
          id: collectionId,
          name: translation.metadata.name,
          nameArabic: COLLECTION_ARABIC[collectionId],
          nameBn: COLLECTION_BANGLA[collectionId],
          availableLanguages: Array.from(new Set(langs)),
          translationLanguages: Array.from(
            new Set(["en", "bn"].filter((l) => langs.includes(l as "en" | "bn"))),
          ) as Array<"en" | "bn">,
        },
        sections,
        hadiths: toEntries(
          translation,
          otherFile,
          arabic,
          collectionId,
          translation.metadata.name,
          usedLang,
          supplement,
        ),
      };

      void writeCache(cacheKey, data);
      return data;
    } catch (err) {
      const cached = await readCache<HadithCollectionData>(cacheKey);
      if (cached) return cached;
      throw err;
    }
  },
};

/* --------------------------- normalization to card -------------------------- */

export function hadithToContent(entry: HadithEntry): ReligiousContent {
  return {
    id: entry.id,
    type: "hadith",
    arabic: entry.arabic || undefined,
    english: entry.english || undefined,
    bangla: entry.bangla || undefined,
    collectionId: entry.collectionId,
    collection: entry.collection,
    collectionArabic: entry.collectionArabic,
    book: entry.book,
    chapter: entry.chapter,
    hadithNumber: entry.hadithNumber,
    grade: entry.grade,
    alsoIn: entry.alsoIn,
  };
}
