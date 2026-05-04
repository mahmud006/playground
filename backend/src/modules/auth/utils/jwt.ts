import crypto from "node:crypto";

import { SignJWT, jwtVerify } from "jose";
import { z } from "zod";

import { env } from "@/env.js";

const AccessPayloadSchema = z.object({
  sub: z.string().min(1),
  email: z.string().email(),
});

export type AccessTokenClaims = {
  userId: string;
  email: string;
};

function accessSecretKey(): Uint8Array {
  return new TextEncoder().encode(env.ACCESS_TOKEN_SECRET);
}

export async function signAccessToken(claims: AccessTokenClaims): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  return new SignJWT({ email: claims.email })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject(claims.userId)
    .setIssuedAt(now)
    .setExpirationTime(now + env.ACCESS_TOKEN_TTL_SECONDS)
    .sign(accessSecretKey());
}

export async function verifyAccessToken(token: string): Promise<AccessTokenClaims> {
  const { payload } = await jwtVerify(token, accessSecretKey(), { algorithms: ["HS256"] });
  const parsed = AccessPayloadSchema.parse(payload);

  return {
    userId: parsed.sub,
    email: parsed.email,
  };
}

export type RefreshToken = {
  token: string;
  jti: string;
  expiresAt: Date;
};

export function createRefreshToken(): RefreshToken {
  const jti = crypto.randomBytes(16).toString("base64url");
  const secretPart = crypto.randomBytes(32).toString("base64url");
  const token = `${jti}.${secretPart}`;

  const expiresAt = new Date(Date.now() + env.REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000);

  return { token, jti, expiresAt };
}

export function hashRefreshToken(token: string): string {
  return crypto.createHmac("sha256", env.REFRESH_TOKEN_SECRET).update(token).digest("hex");
}

export function parseRefreshToken(token: string): { jti: string } | null {
  const [jti] = token.split(".", 2);
  if (!jti) return null;
  return { jti };
}
