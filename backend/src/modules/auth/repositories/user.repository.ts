import { prisma } from "@/db/prisma.js";

export const userRepository = {
  findById(userId: string) {
    return prisma.user.findUnique({ where: { id: userId }, select: { id: true, email: true, createdAt: true } });
  },

  findIdByEmail(email: string) {
    return prisma.user.findUnique({ where: { email }, select: { id: true } });
  },

  findForLogin(email: string) {
    return prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, passwordHash: true },
    });
  },

  createWithPassword(email: string, passwordHash: string) {
    return prisma.user.create({
      data: { email, passwordHash },
      select: { id: true, email: true },
    });
  },

  findEmailById(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: { email: true },
    });
  },
};
