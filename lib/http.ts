const SERVICE_TIMEOUT_MS = 5000;

type RequestOptions = Omit<RequestInit, "signal"> & {
  revalidate?: number | false;
  timeoutMs?: number;
  id?: string;
  /**
   * Status codes that should throw instead of resolving to `null`. Use for calls
   * whose failure must abort the build (e.g. an exhausted API token) rather than
   * silently render an empty page.
   */
  failFastStatuses?: number[];
};

class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly url: string,
    public readonly id: string,
  ) {
    super(`[${id}] ${status} — ${url}`);
    this.name = "HttpError";
  }
}

export async function fetchJson<T>(
  url: string,
  options: RequestOptions = {},
): Promise<T | null> {
  const {
    revalidate = 3600,
    timeoutMs = SERVICE_TIMEOUT_MS,
    id = "http",
    failFastStatuses,
    ...init
  } = options;

  try {
    const response = await fetch(url, {
      ...init,
      next: { revalidate },
      signal: AbortSignal.timeout(timeoutMs),
    });

    if (!response.ok) {
      console.error(
        "[%s] %s %s — %s",
        id,
        response.status,
        response.statusText,
        url,
      );

      if (failFastStatuses?.includes(response.status)) {
        throw new HttpError(response.status, url, id);
      }

      return null;
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }

    console.error("[%s] request failed — %s", id, url, error);
    return null;
  }
}
