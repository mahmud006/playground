import type { Request, Response } from "express";

import { REFRESH_COOKIE_NAME } from "@/modules/auth/utils/cookies.js";
import * as authService from "@/modules/auth/services/auth.service.js";
import { CredentialsSchema } from "@/modules/auth/utils/credentialsSchema.js";
import { clearRefreshCookie, setRefreshCookie } from "@/modules/auth/utils/httpCookies.js";
import { respondAuthError } from "@/modules/auth/utils/respondAuthError.js";
import { userRepository } from "@/modules/auth/repositories/user.repository.js";

const signup = async (req: Request, res: Response): Promise<void> => {
  const parsed = CredentialsSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request", details: parsed.error.flatten() });
    return;
  }

  try {
    const { accessToken, refresh } = await authService.signup(parsed.data.email, parsed.data.password);
    setRefreshCookie(res, refresh.token);
    res.status(201).json({ accessToken });
  } catch (err) {
    respondAuthError(res, err);
  }
}

const login = async (req: Request, res: Response): Promise<void> => {
  const parsed = CredentialsSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request", details: parsed.error.flatten() });
    return;
  }

  try {
    const { accessToken, refresh } = await authService.login(parsed.data.email, parsed.data.password);
    setRefreshCookie(res, refresh.token);
    res.json({ accessToken });
  } catch (err) {
    respondAuthError(res, err);
  }
}

const refresh = async (req: Request, res: Response): Promise<void> => {
  const refreshToken = req.cookies?.[REFRESH_COOKIE_NAME];
  if (typeof refreshToken !== "string" || refreshToken.length === 0) {
    res.status(401).json({ error: "Missing refresh token" });
    return;
  }

  try {
    const { accessToken, refresh: nextRefresh } = await authService.refreshSession(refreshToken);
    setRefreshCookie(res, nextRefresh.token);
    res.json({ accessToken });
  } catch (err) {
    respondAuthError(res, err);
  }
}

const logout = async (req: Request, res: Response): Promise<void> => {
  const refreshToken = req.cookies?.[REFRESH_COOKIE_NAME];
  await authService.logout(
    typeof refreshToken === "string" && refreshToken.length > 0 ? refreshToken : undefined,
  );
  clearRefreshCookie(res);
  res.status(204).send();
}

const profile = async (req: Request, res: Response): Promise<void> => {
  const userId = req.auth?.userId;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const user = await userRepository.findById(userId);
  if (!user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  res.json({ user: { id: user.id, email: user.email, createdAt: user.createdAt } });
};

export { signup, login, refresh, logout, profile };