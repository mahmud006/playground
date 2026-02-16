import { apiJson, ApiError } from "../../lib/api";

let refreshInFlight: Promise<string | null> | null = null;

export async function refreshAccessTokenOnce(setAccessToken: (t: string | null) => void): Promise<string | null> {
  if (!refreshInFlight) {
    refreshInFlight = (async () => {
      try {
        const { accessToken } = await apiJson<{ accessToken: string }>("/auth/refresh", { method: "POST" });
        setAccessToken(accessToken);
        return accessToken;
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) {
          setAccessToken(null);
          return null;
        }
        throw err;
      } finally {
        refreshInFlight = null;
      }
    })();
  }

  return refreshInFlight;
}

