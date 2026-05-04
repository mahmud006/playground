import { prisma } from "@/db/prisma.js";
import {
  createRefreshToken,
  hashRefreshToken,
  parseRefreshToken,
  type RefreshToken,
} from "@/modules/auth/utils/jwt.js";

export async function persistRefreshToken(params: {
  userId: string;
  refresh: RefreshToken;
}): Promise<void> {
  await prisma.refreshToken.create({
    data: {
      userId: params.userId,
      jti: params.refresh.jti,
      tokenHash: hashRefreshToken(params.refresh.token),
      expiresAt: params.refresh.expiresAt,
    },
  });
}

export async function rotateRefreshToken(oldToken: string): Promise<{
  userId: string;
  newRefresh: RefreshToken;
}> {
  const parsed = parseRefreshToken(oldToken);
  if (!parsed) throw new Error("Invalid refresh token");

  const tokenHash = hashRefreshToken(oldToken);
  const now = new Date();

  const existing = await prisma.refreshToken.findFirst({
    where: {
      jti: parsed.jti,
      tokenHash,
      revokedAt: null,
      expiresAt: { gt: now },
    },
    select: { id: true, userId: true },
  });

  if (!existing) throw new Error("Refresh token is invalid or expired");

  const newRefresh = createRefreshToken();

  await prisma.$transaction([
    prisma.refreshToken.update({
      where: { id: existing.id },
      data: { revokedAt: now },
    }),
    prisma.refreshToken.create({
      data: {
        userId: existing.userId,
        jti: newRefresh.jti,
        tokenHash: hashRefreshToken(newRefresh.token),
        expiresAt: newRefresh.expiresAt,
      },
    }),
  ]);

  return { userId: existing.userId, newRefresh };
}

export async function revokeRefreshToken(token: string): Promise<void> {
  const parsed = parseRefreshToken(token);
  if (!parsed) return;

  const now = new Date();
  const tokenHash = hashRefreshToken(token);

  await prisma.refreshToken.updateMany({
    where: { jti: parsed.jti, tokenHash, revokedAt: null },
    data: { revokedAt: now },
  });
}
