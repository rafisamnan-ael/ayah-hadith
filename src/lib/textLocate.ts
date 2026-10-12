/**
 * Locates a phrase inside source text ignoring script-specific presentation
 * differences, so authoritative Arabic/Bangla text can be sliced at the exact
 * point a phrase begins.
 *
 * - Arabic: ignores harakat / waqf marks / tatweel and unifies alef & ya forms.
 * - Bangla: canonicalises nukta letters (য়→য+়) and the ো / ৌ vowel signs.
 *
 * The returned index always points into the *original* string, so the slice is
 * a verbatim copy of the source — never a normalised/rewritten string.
 */

const AR_MARKS = /[\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/;

function unifyArabic(ch: string): string {
  switch (ch) {
    case "\u0623":
    case "\u0625":
    case "\u0622":
    case "\u0671":
      return "\u0627";
    case "\u0649":
    case "\u0626":
      return "\u064A";
    case "\u0624":
      return "\u0648";
    case "\u0629":
      return "\u0647";
    default:
      return ch;
  }
}

function canonArabic(text: string): { norm: string; map: number[] } {
  let norm = "";
  const map: number[] = [];
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (AR_MARKS.test(ch)) continue;
    norm += unifyArabic(ch);
    map.push(i);
  }
  return { norm, map };
}

function canonBangla(text: string): { norm: string; map: number[] } {
  let norm = "";
  const map: number[] = [];
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const c = text.charCodeAt(i);
    let out: string;
    if (c === 0x09df) out = "\u09AF\u09BC";
    else if (c === 0x09dc) out = "\u09A1\u09BC";
    else if (c === 0x09dd) out = "\u09A2\u09BC";
    else if (c === 0x09cb) out = "\u09C7\u09BE";
    else if (c === 0x09cc) out = "\u09C7\u09D7";
    else if (c === 0x200c || c === 0x200d) continue;
    else out = ch;
    for (let k = 0; k < out.length; k++) {
      norm += out[k];
      map.push(i);
    }
  }
  return { norm, map };
}

type Kind = "ar" | "bn" | "plain";

function kindOf(query: string): Kind {
  if (/[\u0980-\u09FF]/.test(query)) return "bn";
  if (/[\u0600-\u06FF]/.test(query)) return "ar";
  return "plain";
}

/** Index in `text` where `query` starts, or -1 when not found. */
export function locateIndex(text: string, query: string): number {
  if (!text || !query) return -1;
  const kind = kindOf(query);
  if (kind === "plain") return text.indexOf(query);
  const canon = kind === "bn" ? canonBangla : canonArabic;
  const t = canon(text);
  const q = canon(query).norm;
  const idx = t.norm.indexOf(q);
  return idx < 0 ? -1 : t.map[idx];
}

/** Cuts `text` so that it begins at `query` (verbatim slice). Safe fallback. */
export function sliceFromLocator(
  text: string | undefined,
  query?: string,
): string | undefined {
  if (!text || !query) return text;
  const idx = locateIndex(text, query);
  return idx > 0 ? text.slice(idx).trim() : text;
}
