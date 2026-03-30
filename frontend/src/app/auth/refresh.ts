import { ApiError, resolveApiUrl } from "../api/http";

let refreshInFlight: Promise<string | null> | null = null;
let refreshCooldownUntilMs = 0;

async function readJsonSafe(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

/**
 * Rotation refresh call — 401 is normal when there is no session (no cookie yet, or cookie path/env changed).
 * Uses fetch directly so we do not treat anonymous as an exception path through apiJson.
 */
export async function refreshAccessTokenOnce(setAccessToken: (t: string | null) => void): Promise<string | null> {
  // Prevent repeated refresh attempts when we're not authenticated yet.
  if (Date.now() < refreshCooldownUntilMs) {
    return null;
  }

  if (!refreshInFlight) {
    refreshInFlight = (async () => {
      try {
        const res = await fetch(resolveApiUrl("/auth/refresh"), {
          method: "POST",
          credentials: "include",
          headers: { "content-type": "application/json" },
        });

        if (res.status === 401) {
          refreshCooldownUntilMs = Date.now() + 5_000;
          setAccessToken(null);
          return null;
        }

        const body = await readJsonSafe(res);
        if (!res.ok) {
          const message =
            typeof body === "object" && body !== null && "error" in body
              ? String((body as { error?: unknown }).error ?? res.statusText)
              : res.statusText;
          throw new ApiError(res.status, message, body);
        }

        if (typeof body !== "object" || body === null || !("accessToken" in body)) {
          throw new ApiError(res.status, "Invalid refresh response", body);
        }

        const accessToken = String((body as { accessToken: unknown }).accessToken);
        setAccessToken(accessToken);
        return accessToken;
      } finally {
        refreshInFlight = null;
      }
    })();
  }

  return refreshInFlight;
}
