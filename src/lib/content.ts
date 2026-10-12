import type { AppLanguage, CardMetadataOptions, ReligiousContent } from "@/types";
import { localizeNumber } from "@/lib/utils";
import { surahNameBn } from "@/data/surahNamesBn";
import { collectionNameBn } from "@/data/collectionNamesBn";

/** Localized surah display name (Bangla transliteration where available). */
export function surahDisplayName(
  content: ReligiousContent,
  lang: AppLanguage,
): string {
  if (lang === "bn" && content.surahNumber) {
    return surahNameBn(content.surahNumber) ?? content.surahNameEnglish ?? content.surahName ?? "";
  }
  return content.surahNameEnglish || content.surahName || "";
}

/** Localized collection display name. */
export function collectionDisplayName(
  content: ReligiousContent,
  lang: AppLanguage,
): string {
  if (lang === "bn") {
    return collectionNameBn(content.collectionId) ?? content.collection ?? "";
  }
  return content.collection || content.collectionId || "";
}

/** Localizes a numeric reference like "112:1" to Bangla digits. */
export function localizeRef(ref: string, lang: AppLanguage): string {
  return lang === "bn" ? localizeNumber(ref, "bn") : ref;
}

/** The translation shown for the current interface language, if any. */
export function translationFor(
  content: ReligiousContent,
  lang: AppLanguage,
): string | undefined {
  const text = lang === "bn" ? content.bangla : content.english;
  return text && text.trim() ? text : undefined;
}

/** True when the content has a translation in the requested language. */
export function hasTranslation(
  content: ReligiousContent,
  lang: AppLanguage,
): boolean {
  return Boolean(translationFor(content, lang));
}

/** The other translation, useful for the "translation focus" templates. */
export function alternateTranslation(
  content: ReligiousContent,
  lang: AppLanguage,
): string | undefined {
  const text = lang === "bn" ? content.english : content.bangla;
  return text && text.trim() ? text : undefined;
}

/** Short reference like `Al-Baqarah · 2:286` or `Sahih al-Bukhari · 1234`. */
export function referenceLine(
  content: ReligiousContent,
  lang: AppLanguage,
): string {
  if (content.type === "quran") {
    const name = surahDisplayName(content, lang);
    const num =
      content.surahNumber && content.verseNumber
        ? localizeRef(`${content.surahNumber}:${content.verseNumber}`, lang)
        : "";
    return [name, num].filter(Boolean).join(" · ");
  }
  const col = collectionDisplayName(content, lang);
  const num = content.hadithNumber
    ? `${lang === "bn" ? "হাদিস" : "Hadith"} ${localizeRef(content.hadithNumber, lang)}`
    : "";
  return [col, num].filter(Boolean).join(" · ");
}

/** Full source line for hadith, avoiding fabricated grades. */
export function sourceLine(content: ReligiousContent): string | undefined {
  if (content.type !== "hadith") return undefined;
  const parts: string[] = [];
  if (content.collection) parts.push(content.collection);
  if (content.book) parts.push(`Book ${content.book}`);
  if (content.chapter) parts.push(content.chapter);
  if (content.hadithNumber) parts.push(`Hadith ${content.hadithNumber}`);
  return parts.length ? parts.join(" · ") : undefined;
}

export function visibleMetadata(
  content: ReligiousContent,
  options: CardMetadataOptions,
  lang: AppLanguage,
): string[] {
  const lines: string[] = [];
  if (options.showReference) {
    const ref = referenceLine(content, lang);
    if (ref) lines.push(ref);
  }
  if (options.showBook && content.type === "hadith" && content.collection) {
    lines.push(content.collection);
  }
  if (options.showChapter && content.chapter) {
    lines.push(content.chapter);
  }
  return Array.from(new Set(lines));
}

/** Builds a dedupe/topic search string from available content. */
export function searchableText(content: ReligiousContent): string {
  return [
    content.arabic,
    content.english,
    content.bangla,
    content.surahName,
    content.surahNameEnglish,
    content.collection,
    content.chapter,
    content.hadithNumber,
    content.topic,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function isContentEqual(a?: ReligiousContent, b?: ReligiousContent): boolean {
  return Boolean(a && b && a.id === b.id);
}
