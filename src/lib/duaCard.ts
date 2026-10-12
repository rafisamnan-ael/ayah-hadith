import { sliceDuaFrom } from "@/data/duaOnly";
import type { ReligiousContent } from "@/types";

/**
 * Removes an unmatched closing quote left behind when a quotation was cut at
 * its opening (e.g. `Indeed, adversity has touched me…merciful."`).
 */
function tidyQuotes(text?: string): string | undefined {
  if (!text) return text;
  let t = text.trim();
  if (!t || /^["“«]/.test(t)) return t; // the quote opens here — keep it intact
  const straight = (t.match(/"/g) ?? []).length;
  const curlyOpen = (t.match(/[“«]/g) ?? []).length;
  const curlyClose = (t.match(/[”»]/g) ?? []).length;
  // An odd straight quote (with no opener at the start) is an orphan closer;
  // likewise a curly close without its open.
  if (straight % 2 === 1 || curlyClose > curlyOpen) {
    t = t.replace(/\s*["”»]+$/, "").trim();
  }
  return t;
}

/**
 * Card content for a Qur'anic du'a: the Arabic, English and Bangla are trimmed
 * to just the supplication so the photocard matches its transliteration.
 *
 * Only Qur'anic du'as (`dua:` ids) with a known anchor are affected; every other
 * content (including the reading pages) is returned untouched.
 */
export function duaCardContent(content: ReligiousContent): ReligiousContent {
  if (
    !content.id.startsWith("dua:") ||
    !content.surahNumber ||
    !content.verseNumber
  ) {
    return content;
  }
  const sliced = sliceDuaFrom(`${content.surahNumber}:${content.verseNumber}`, {
    arabic: content.arabic,
    english: content.english,
    bangla: content.bangla,
  });
  return {
    ...content,
    arabic: sliced.arabic,
    english: tidyQuotes(sliced.english),
    bangla: tidyQuotes(sliced.bangla),
  };
}
