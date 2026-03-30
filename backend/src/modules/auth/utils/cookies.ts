import type { CookieOptions } from "express";

import { env } from "../../../env.js";

export const REFRESH_COOKIE_NAME = "refresh_token";

export function refreshCookieOptions(): CookieOptions {
  const isProd = env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/auth",
    maxAge: env.REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000,
  };
}
