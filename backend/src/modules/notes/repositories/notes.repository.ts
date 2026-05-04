import { prisma } from "@/db/prisma.js";
import type { CreateNoteInput } from "@/modules/notes/utils/notesSchemas.js";

export const notesRepository = {
  listForUser(userId: string) {
    return prisma.note.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },

  create(userId: string, data: CreateNoteInput) {
    return prisma.note.create({
      data: {
        ...data,
        userId,
      },
    });
  },

  findById(id: string, userId: string) {
    return prisma.note.findFirst({
      where: { id, userId },
    });
  },

  delete(id: string, userId: string) {
    return prisma.note.deleteMany({
      where: { id, userId },
    });
  },
};
