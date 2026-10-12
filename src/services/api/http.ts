export class ApiError extends Error {
  status: number;
  retryable: boolean;
  constructor(message: string, status = 0, retryable = true) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.retryable = retryable;
  }
}

export interface FetchJsonOptions extends RequestInit {
  timeoutMs?: number;
  retries?: number;
  signal?: AbortSignal;
}

function isAbort(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    (err as { name?: string }).name === "AbortError"
  );
}

/**
 * Fetch JSON with a hard timeout, automatic retry with backoff, and friendly
 * error messages. Raw network/HTTP detail is kept on the ApiError but the UI
 * should always present a translated, friendly message.
 */
export async function fetchJson<T>(
  url: string,
  { timeoutMs = 20000, retries = 2, signal, ...init }: FetchJsonOptions = {},
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const onExternalAbort = () => controller.abort();
    signal?.addEventListener("abort", onExternalAbort);

    try {
      const res = await fetch(url, {
        ...init,
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          ...(init.headers || {}),
        },
      });

      if (!res.ok) {
        const retryable = res.status >= 500 || res.status === 429;
        throw new ApiError(`Request failed with status ${res.status}`, res.status, retryable);
      }

      return (await res.json()) as T;
    } catch (err) {
      lastError = err;
      if (signal?.aborted) throw err;
      if (isAbort(err)) {
        lastError = new ApiError("Request timed out", 0, true);
      }
      const retryable =
        !(lastError instanceof ApiError) || lastError.retryable;
      if (!retryable || attempt === retries) break;
      await new Promise((r) => setTimeout(r, 350 * Math.pow(2, attempt)));
    } finally {
      clearTimeout(timer);
      signal?.removeEventListener("abort", onExternalAbort);
    }
  }

  if (lastError instanceof ApiError) throw lastError;
  throw new ApiError(
    lastError instanceof Error ? lastError.message : "Unknown network error",
    0,
    true,
  );
}
