/**
 * Supplementary source for Sahih Muslim.
 *
 * The main provider (fawazahmed0/hadith-api) ships Sahih Muslim's Introduction
 * (hadiths 1–92) and a handful of other narrations with no text at all. The
 * community "hadithbangla" dataset has them (Arabic + Bangla, keyless via
 * jsDelivr), so we fetch *only the missing narrations* — a few hundred tiny
 * files — and merge them in. English isn't available there, so those entries
 * simply have Arabic + Bangla.
 *
 * Used only for the Muslim collection; nothing else is affected.
 */
const BASE = "https://cdn.jsdelivr.net/gh/md-rifatkhan/hadithbangla@main";

export interface SupplementText {
  ar?: string;
  bn?: string;
}

/** Safety cap so a broken primary source can't trigger thousands of fetches. */
const MAX_REQUESTS = 600;
const CONCURRENCY = 16;
const TIMEOUT_MS = 15000;

/** Combines the caller's signal with a per-request timeout (when supported). */
function withTimeout(signal: AbortSignal | undefined, ms: number): AbortSignal | undefined {
  const t =
    typeof AbortSignal !== "undefined" && typeof AbortSignal.timeout === "function"
      ? AbortSignal.timeout(ms)
      : undefined;
  if (signal && t && typeof AbortSignal.any === "function") {
    return AbortSignal.any([signal, t]);
  }
  return signal ?? t;
}

export async function fetchMuslimSupplement(
  numbers: string[],
  signal?: AbortSignal,
): Promise<Map<string, SupplementText>> {
  const out = new Map<string, SupplementText>();
  const list = numbers.slice(0, MAX_REQUESTS);
  let index = 0;

  async function worker() {
    while (index < list.length) {
      const num = list[index++];
      try {
        const res = await fetch(`${BASE}/Muslim/hadith/${encodeURIComponent(num)}.json`, {
          signal: withTimeout(signal, TIMEOUT_MS),
          headers: { Accept: "application/json" },
        });
        if (!res.ok) continue;
        const data = (await res.json()) as { hadith?: { ar?: string; bn?: string } };
        const ar = data.hadith?.ar?.trim();
        const bn = data.hadith?.bn?.trim();
        if (ar || bn) out.set(num, { ar: ar || undefined, bn: bn || undefined });
      } catch {
        /* network/abort — leave this narration as-is */
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, list.length) }, worker),
  );
  return out;
}
