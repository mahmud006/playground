import { Router } from "express";

import { prisma } from "../db/prisma.js";
import { requireAuth } from "../auth/requireAuth.js";

export const meRouter = Router();

meRouter.get("/", requireAuth, async (req, res) => {
  const userId = req.auth?.userId;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, createdAt: true },
  });

  if (!user) return res.status(401).json({ error: "Unauthorized" });

  return res.json({ user });
});

