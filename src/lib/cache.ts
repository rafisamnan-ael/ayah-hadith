import { get, set, del } from "idb-keyval";

/**
 * Thin persistent cache on top of IndexedDB. Used for large, rarely-changing
 * payloads (full hadith collections) so repeat visits are instant and work
 * offline. Failures are swallowed — the cache is a best-effort optimisation.
 */
export async function readCache<T>(key: string): Promise<T | undefined> {
  try {
    return (await get<T>(key)) ?? undefined;
  } catch {
    return undefined;
  }
}

export async function writeCache<T>(key: string, value: T): Promise<void> {
  try {
    await set(key, value);
  } catch {
    /* quota or private mode — ignore */
  }
}

export async function clearCache(key: string): Promise<void> {
  try {
    await del(key);
  } catch {
    /* ignore */
  }
}
