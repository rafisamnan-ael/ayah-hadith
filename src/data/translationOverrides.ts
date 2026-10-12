/**
 * Curated translation overrides.
 *
 * Upstream translations (Saheeh International for English, Muhiuddin Khan for
 * Bangla) are used verbatim, except where a verse is quoted in the app and the
 * wording is confusing on its own (e.g. a prophet named only by the English
 * form). Only the *translation* is ever adjusted here — the Arabic text is
 * never modified.
 *
 * Key format: "<surah>:<ayah>".
 */
export const TRANSLATION_OVERRIDES: Record<string, { en?: string; bn?: string }> = {
  // Du'a of Ayyub (a.s.) — name the prophet clearly so it stands alone on a card.
  "21:83": {
    en: 'And [mention] Ayub Job, when he called to his Lord, "Indeed, adversity has touched me, and you are the Most Merciful of the merciful."',
  },
};

export function getTranslationOverride(
  surahNumber: number,
  verseNumber: number,
): { en?: string; bn?: string } | undefined {
  return TRANSLATION_OVERRIDES[`${surahNumber}:${verseNumber}`];
}
