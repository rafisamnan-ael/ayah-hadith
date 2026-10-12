/**
 * Repairs corruption in the Bangla Qur'an translation (bn.bengali).
 *
 * The provider mangles numeric HTML character references: the leading `&#`
 * (or `&`) is lost, leaving e.g. `?2470;` where `&#2470;` ("দ") was intended,
 * and a few lose the leading `2` (`480` -> `2480` "র"). The same data also has
 * a handful of stray characters from unrelated scripts (NKo, Javanese, CJK…).
 * These show up as junk like "সামর্থ?2470;াও".
 *
 * We decode the mangled reference back to its character (only when it lands in
 * the Bengali block), drop the stray foreign-script characters, and touch
 * nothing else.
 */
const BANGLA_BLOCK = /[\u0980-\u09FF\u0964\u200c\u200d]/;

/** Characters that never belong in a Bengali translation (observed junk). */
const FOREIGN_JUNK =
  /[\u02B0-\u02FF\u0300-\u036F\u0600-\u06FF\u0700-\u07FF\u2E80-\u9FFF\uA980-\uA9DF\uF900-\uFAFF\uFE30-\uFE4F]/g;

const ENTITY = /[?&]?#?\d{2,6};/g;

/** Decodes a mangled code point, trying the value as-is and with a "+2000" fix. */
function decodeCodePoint(code: number): string {
  for (const candidate of [code, code + 2000]) {
    if (candidate < 32 || candidate > 0x10ffff) continue;
    const ch = String.fromCodePoint(candidate);
    if (BANGLA_BLOCK.test(ch)) return ch;
  }
  return "";
}

export function repairBanglaArtifacts(input?: string): string | undefined {
  if (!input) return input;
  return input
    .replace(ENTITY, (match) =>
      decodeCodePoint(Number(match.replace(/[^\d]/g, "")) || 0),
    )
    .replace(FOREIGN_JUNK, "");
}
