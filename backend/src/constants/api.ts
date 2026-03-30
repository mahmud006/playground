/** All HTTP routes (except future root redirects) live under this path. */
export const API_V1_PREFIX = "/api/v1";

/** Refresh cookie: scope to all v1 API paths so `/auth/refresh` always receives it after login. */
export const AUTH_COOKIE_PATH = API_V1_PREFIX;
