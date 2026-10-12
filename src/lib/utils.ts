import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/** Converts western digits to Bangla digits when the language is Bengali. */
export function localizeNumber(value: number | string, lang: "en" | "bn"): string {
  const s = String(value);
  if (lang !== "bn") return s;
  const digits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return s.replace(/\d/g, (d) => digits[Number(d)]);
}

/**
 * Normalizes Bangla (০–৯) and Arabic-Indic (٠–٩) digits to western digits and
 * strips anything else, so number inputs work with an Avro/Bangla keyboard.
 */
export function parseDigits(input: string): string {
  return (input || "")
    .replace(/[\u09E6-\u09EF]/g, (d) => String(d.charCodeAt(0) - 0x09e6))
    .replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[^\d]/g, "");
}

/** Parses a (possibly Bangla/Arabic-digit) number string to an integer. */
export function parseNumber(input: string): number | null {
  const digits = parseDigits(input);
  if (!digits) return null;
  const n = Number(digits);
  return Number.isFinite(n) ? n : null;
}

/** Rough word count used for template capacity hints. */
export function wordCount(text?: string): number {
  if (!text) return 0;
  return text.trim().split(/\s+/).length;
}
