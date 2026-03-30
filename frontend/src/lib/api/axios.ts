import axios from "axios";

import { API_V1_PREFIX } from "@/config/constants.ts";

let accessTokenGetter: (() => string | null) | null = null;
let refreshFn: (() => Promise<string | null>) | null = null;

/**
 * Called once during app bootstrap (from AuthProvider) so the interceptors
 * can read the current access token and trigger a refresh without a
 * circular dependency on React context.
 */
export function configureAuth(
  getToken: () => string | null,
  refresh: () => Promise<string | null>,
) {
  accessTokenGetter = getToken;
  refreshFn = refresh;
}

const api = axios.create({
  baseURL: API_V1_PREFIX,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = accessTokenGetter?.();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshPromise: Promise<string | null> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (
      error.response?.status === 401 &&
      !original._retry &&
      refreshFn
    ) {
      original._retry = true;

      if (!refreshPromise) {
        refreshPromise = refreshFn().finally(() => {
          refreshPromise = null;
        });
      }

      const newToken = await refreshPromise;
      if (newToken) {
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
