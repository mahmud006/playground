import { hashPassword, verifyPassword } from "@/modules/auth/utils/crypto.js";
import { createRefreshToken, signAccessToken, type RefreshToken } from "@/modules/auth/utils/jwt.js";
import {
  persistRefreshToken,
  revokeRefreshToken,
  rotateRefreshToken,
} from "@/modules/auth/repositories/refreshToken.repository.js";
import { userRepository } from "@/modules/auth/repositories/user.repository.js";
import { AuthServiceError } from "@/modules/auth/utils/authErrors.js";

export type AuthSession = {
  accessToken: string;
  refresh: RefreshToken;
};

export async function signup(email: string, password: string): Promise<AuthSession> {
  const existing = await userRepository.findIdByEmail(email);
  if (existing) {
    throw new AuthServiceError("Email already in use", 409);
  }

  const passwordHash = await hashPassword(password);
  const user = await userRepository.createWithPassword(email, passwordHash);
  const refresh = createRefreshToken();
  await persistRefreshToken({ userId: user.id, refresh });
  const accessToken = await signAccessToken({ userId: user.id, email: user.email });
  return { accessToken, refresh };
}

export async function login(email: string, password: string): Promise<AuthSession> {
  const user = await userRepository.findForLogin(email);
  if (!user) {
    throw new AuthServiceError("Invalid credentials", 401);
  }

  const ok = await verifyPassword(user.passwordHash, password);
  if (!ok) {
    throw new AuthServiceError("Invalid credentials", 401);
  }

  const refresh = createRefreshToken();
  await persistRefreshToken({ userId: user.id, refresh });
  const accessToken = await signAccessToken({ userId: user.id, email: user.email });
  return { accessToken, refresh };
}

export async function refreshSession(refreshToken: string): Promise<AuthSession> {
  try {
    const { userId, newRefresh } = await rotateRefreshToken(refreshToken);
    const user = await userRepository.findEmailById(userId);
    if (!user) {
      throw new AuthServiceError("Invalid refresh token", 401);
    }
    const accessToken = await signAccessToken({ userId, email: user.email });
    return { accessToken, refresh: newRefresh };
  } catch {
    throw new AuthServiceError("Invalid refresh token", 401);
  }
}

export async function logout(refreshToken: string | undefined): Promise<void> {
  if (typeof refreshToken === "string" && refreshToken.length > 0) {
    await revokeRefreshToken(refreshToken);
  }
}
