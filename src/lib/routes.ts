import { surahNameBn } from "@/data/surahNamesBn";
import { collectionNameBn } from "@/data/collectionNamesBn";
import { localizeNumber } from "@/lib/utils";
import type { AppLanguage, ReligiousContent } from "@/types";

/** Route to the reading page for a piece of content. */
export function contentHref(content: ReligiousContent): string {
  if (content.type === "quran" && content.surahNumber && content.verseNumber) {
    return `/quran/${content.surahNumber}?verse=${content.verseNumber}`;
  }
  if (content.type === "hadith" && content.collectionId && content.hadithNumber) {
    return `/hadith/${content.collectionId}/${content.hadithNumber}`;
  }
  return "/";
}

/** Localized short reference, e.g. "Al-Ikhlaas ১১২:১" or "সহিহ বুখারি ১". */
export function shortLabel(
  content: ReligiousContent,
  language: AppLanguage = "en",
): string {
  const bangla = language === "bn";
  if (content.type === "quran") {
    const name =
      bangla && content.surahNumber
        ? surahNameBn(content.surahNumber) ?? content.surahNameEnglish ?? ""
        : content.surahNameEnglish || content.surahName || "";
    const ref =
      content.surahNumber && content.verseNumber
        ? bangla
          ? localizeNumber(`${content.surahNumber}:${content.verseNumber}`, "bn")
          : `${content.surahNumber}:${content.verseNumber}`
        : "";
    return `${name} ${ref}`.trim();
  }
  const col = bangla
    ? collectionNameBn(content.collectionId) ?? content.collection ?? ""
    : content.collection ?? "";
  const n = content.hadithNumber
    ? bangla
      ? localizeNumber(content.hadithNumber, "bn")
      : content.hadithNumber
    : "";
  return `${col} ${n}`.trim();
}
