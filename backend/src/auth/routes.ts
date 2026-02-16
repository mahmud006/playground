import { Router } from "express";
import { z } from "zod";

import { prisma } from "../db/prisma.js";
import { hashPassword, verifyPassword } from "./crypto.js";
import { REFRESH_COOKIE_NAME, refreshCookieOptions } from "./cookies.js";
import { createRefreshToken, signAccessToken } from "./jwt.js";
import { persistRefreshToken, revokeRefreshToken, rotateRefreshToken } from "./refreshStore.js";

const CredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(200),
});

export const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
  const parsed = CredentialsSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid request", details: parsed.error.flatten() });
  }

  const { email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  if (existing) return res.status(409).json({ error: "Email already in use" });

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, passwordHash },
    select: { id: true, email: true },
  });

  const refresh = createRefreshToken();
  await persistRefreshToken({ userId: user.id, refresh });
  res.cookie(REFRESH_COOKIE_NAME, refresh.token, refreshCookieOptions());

  const accessToken = await signAccessToken({ userId: user.id, email: user.email });
  return res.status(201).json({ accessToken });
});

authRouter.post("/login", async (req, res) => {
  const parsed = CredentialsSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid request", details: parsed.error.flatten() });
  }

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, passwordHash: true },
  });

  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await verifyPassword(user.passwordHash, password);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const refresh = createRefreshToken();
  await persistRefreshToken({ userId: user.id, refresh });
  res.cookie(REFRESH_COOKIE_NAME, refresh.token, refreshCookieOptions());

  const accessToken = await signAccessToken({ userId: user.id, email: user.email });
  return res.json({ accessToken });
});

authRouter.post("/refresh", async (req, res) => {
  const refreshToken = req.cookies?.[REFRESH_COOKIE_NAME];
  if (typeof refreshToken !== "string" || refreshToken.length === 0) {
    return res.status(401).json({ error: "Missing refresh token" });
  }

  try {
    const { userId, newRefresh } = await rotateRefreshToken(refreshToken);
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { email: true } });
    if (!user) return res.status(401).json({ error: "Invalid refresh token" });

    res.cookie(REFRESH_COOKIE_NAME, newRefresh.token, refreshCookieOptions());
    const accessToken = await signAccessToken({ userId, email: user.email });
    return res.json({ accessToken });
  } catch {
    return res.status(401).json({ error: "Invalid refresh token" });
  }
});

authRouter.post("/logout", async (req, res) => {
  const refreshToken = req.cookies?.[REFRESH_COOKIE_NAME];
  if (typeof refreshToken === "string" && refreshToken.length > 0) {
    await revokeRefreshToken(refreshToken);
  }

  res.clearCookie(REFRESH_COOKIE_NAME, { ...refreshCookieOptions(), maxAge: 0 });
  return res.status(204).send();
});

