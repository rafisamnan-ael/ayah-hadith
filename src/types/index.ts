export type ContentType = "quran" | "hadith";

/** Interface / content language for the app. Arabic is always available separately. */
export type AppLanguage = "en" | "bn";

/** A single normalized piece of religious content, provider-agnostic. */
export interface ReligiousContent {
  /** Stable local id, e.g. `quran:2:286` or `hadith:bukhari:1`. */
  id: string;
  type: ContentType;

  arabic?: string;
  english?: string;
  bangla?: string;
  /** Latin transliteration (mainly for du'as). */
  transliteration?: string;
  /** Full narration text, when only the du'a is shown by default. */
  arabicFull?: string;
  englishFull?: string;
  banglaFull?: string;
  /** Reason/theme of the du'a (e.g. "Hardship & Distress"), for the card eyebrow. */
  categoryEn?: string;
  categoryBn?: string;

  /* ---- Quran metadata ---- */
  surahName?: string;
  surahNameArabic?: string;
  surahNameEnglish?: string;
  surahNumber?: number;
  verseNumber?: number;
  juz?: number;
  revelationType?: string;

  /* ---- Hadith metadata ---- */
  collectionId?: string;
  collection?: string;
  collectionArabic?: string;
  /** Bangla form of the collection/attribution (for du'as from the Sunnah). */
  collectionBn?: string;
  /** Other collections the narration is also reported in. */
  alsoIn?: string[];
  book?: string;
  chapter?: string;
  hadithNumber?: string;

  /* ---- Shared ---- */
  topic?: string;
  grade?: string;
}

export interface Dua {
  id: string;
  category: string;
  title: { en: string; bn: string };
  /** Latin transliteration of the Arabic. */
  transliteration: string;
  surah: number;
  ayah: number;
}

export interface DuaCategory {
  id: string;
  en: string;
  bn: string;
}

/** Normalized general (Sunnah) du'a payload from the proxy API. */
export interface GeneralDuaData {
  id: string;
  arabic: string | null;
  english: string | null;
  bangla: string | null;
  arabicFull?: string | null;
  englishFull?: string | null;
  banglaFull?: string | null;
  titleEn: string | null;
  titleBn: string | null;
  attributionEn: string | null;
  attributionBn: string | null;
  gradeEn: string | null;
  gradeBn: string | null;
}

export interface SurahSummary {
  number: number;
  name: string; // Arabic
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface QuranVerse {
  id: string;
  surahNumber: number;
  surahName: string;
  surahNameEnglish: string;
  verseNumber: number;
  juz: number;
  arabic: string;
  english?: string;
  bangla?: string;
}

export interface HadithEntry {
  id: string;
  collectionId: string;
  collection: string;
  collectionArabic?: string;
  book?: string;
  chapter?: string;
  hadithNumber: string;
  arabic?: string;
  english?: string;
  bangla?: string;
  grade?: string;
  /** Other collections the same narration is reported in (from the citation). */
  alsoIn?: string[];
}

export interface HadithCollectionSummary {
  id: string;
  name: string;
  nameArabic?: string;
  nameBn?: string;
  availableLanguages: Array<"ar" | "en" | "bn">;
  /** Languages besides Arabic that the app can show. */
  translationLanguages: Array<"en" | "bn">;
}

export interface HadithCollectionData {
  collection: HadithCollectionSummary;
  sections: Record<string, string>;
  hadiths: HadithEntry[];
}

/* ---- Photocard ---- */

export type CardFormat = "portrait" | "square" | "story";

export interface CardFormatSpec {
  id: CardFormat;
  width: number;
  height: number;
  label: { en: string; bn: string };
}

export interface CardMetadataOptions {
  showArabic: boolean;
  showTranslation: boolean;
  showReference: boolean;
  showBook: boolean;
  showChapter: boolean;
  showSource: boolean;
}

export interface ContainedImageState {
  /** data URL or object URL of the uploaded / generated image. */
  src: string;
  zoom: number; // 1 = cover
  /** Pan offset in card pixels. */
  offsetX: number;
  offsetY: number;
  /** Dark scrim opacity over the image (0..1). */
  overlay: number;
  /** Image transparency (0..1). */
  opacity: number;
}

export interface CardRenderOptions {
  /** Which translation to prefer when rendering the translation block. */
  translationLanguage: "en" | "bn" | "translit" | "none";
  metadata: CardMetadataOptions;
  format: CardFormat;
  /** Palette id from `lib/palettes`, or "custom". */
  paletteId?: string;
  /** `custom` background hex, when paletteId is "custom". */
  customBg?: string;
  /** Background treatment. */
  background?: "solid" | "gradient" | "pattern" | "grain";
  /** Whether the image is placed as the template photo or behind the card. */
  imageMode?: "photo" | "background";
  /** Decorative corner ticks / finishing touches. */
  decor?: boolean;
  /** Show the brand logo in the top-right corner. */
  showLogo?: boolean;
  /** Scale applied to the card's text (0.8 – 1.4). */
  textScale?: number;
  /** Extra multiplier for Arabic text. */
  arabicScale?: number;
  /** Extra multiplier for translation text. */
  translationScale?: number;
  /** Show the brand signature line. */
  showBrand?: boolean;
  /** Brand signature / handle. */
  brandText?: string;
  /** Optional transliteration line rendered directly under the Arabic. */
  transliteration?: string;
  /** Optional eyebrow label at the top of the card (e.g. the du'a category). */
  category?: string;
}

export interface TemplateDefinition {
  id: string;
  name: { en: string; bn: string };
  description: { en: string; bn: string };
  /** Picker grouping. */
  group?: "minimal" | "editorial" | "image" | "themed";
  /** Palette the template is designed around (auto-applied on select). */
  defaultPalette?: string;
  /** Whether an uploaded image is meaningfully used. */
  supportsImage: boolean;
  /** Whether the template looks best with no image. */
  prefersNoImage?: boolean;
  /** Rough content length this template is designed for. */
  capacity: "short" | "medium" | "long";
  /** Whether Arabic is the visual hero. */
  arabicHero: boolean;
}
