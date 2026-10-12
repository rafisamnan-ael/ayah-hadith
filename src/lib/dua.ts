import type { Dua, GeneralDuaData, QuranVerse, ReligiousContent } from "@/types";
import type { GeneralDua } from "@/data/generalDuas";
import { getDuaCategory } from "@/data/duas";
import { getGeneralDuaCategory } from "@/data/generalDuas";

/** Builds normalized card content for a du'a from its resolved Qur'an verse. */
export function duaToContent(dua: Dua, verse?: QuranVerse): ReligiousContent {
  const category = getDuaCategory(dua.category);
  return {
    id: `dua:${dua.id}`,
    type: "quran",
    arabic: verse?.arabic,
    english: verse?.english,
    bangla: verse?.bangla,
    transliteration: dua.transliteration,
    categoryEn: category?.en,
    categoryBn: category?.bn,
    surahName: verse?.surahName,
    surahNameEnglish: verse?.surahNameEnglish,
    surahNumber: dua.surah,
    verseNumber: dua.ayah,
    topic: dua.title.en,
  };
}

export function duaRef(dua: Dua): string {
  return `${dua.surah}:${dua.ayah}`;
}

/** Builds normalized card content for a general (Sunnah) du'a. */
export function generalDuaToContent(
  dua: GeneralDua,
  data?: GeneralDuaData,
): ReligiousContent {
  const category = getGeneralDuaCategory(dua.category);
  return {
    id: `dua-g:${dua.ref}`,
    type: "hadith",
    arabic: data?.arabic ?? undefined,
    english: data?.english ?? undefined,
    bangla: data?.bangla ?? undefined,
    transliteration: dua.transliteration,
    categoryEn: category?.en,
    categoryBn: category?.bn,
    arabicFull: data?.arabicFull ?? undefined,
    englishFull: data?.englishFull ?? undefined,
    banglaFull: data?.banglaFull ?? undefined,
    collection: data?.attributionEn ?? undefined,
    collectionBn: data?.attributionBn ?? undefined,
    grade: data?.gradeEn ?? undefined,
    topic: dua.title.en,
  };
}
