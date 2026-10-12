/**
 * Runtime API configuration.
 *
 * The default providers are free and keyless, so no authentication is created
 * here. If you later swap in a provider that needs a key, add it as a
 * server-only variable (no `NEXT_PUBLIC_` prefix) and proxy requests through a
 * route handler so the secret never reaches the browser.
 */
export const apiConfig = {
  quranBaseUrl:
    process.env.NEXT_PUBLIC_QURAN_API_URL?.replace(/\/$/, "") ||
    "https://api.alquran.cloud/v1",
  hadithBaseUrl:
    process.env.NEXT_PUBLIC_HADITH_API_URL?.replace(/\/$/, "") ||
    "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1",
  /** Keys are optional and only read server-side. Do not expose them to the client. */
  quranApiKey: process.env.QURAN_API_KEY || "",
  hadithApiKey: process.env.HADITH_API_KEY || "",
} as const;

/** Edition identifiers for the Qur'an provider, per language. */
export const QURAN_EDITIONS = {
  arabic: "quran-uthmani",
  english: "en.sahih",
  bangla: "bn.bengali",
} as const;

/** Providers whose translations we surface in the UI (with attribution). */
export const TRANSLATION_SOURCES = {
  english: "Saheeh International (via alquran.cloud)",
  bangla: "Muhiuddin Khan (via alquran.cloud)",
} as const;
