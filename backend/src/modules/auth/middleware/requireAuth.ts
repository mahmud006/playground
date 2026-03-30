import type { NextFunction, Request, Response } from "express";

import { verifyAccessToken } from "../utils/jwt.js";

function extractBearerToken(req: Request): string | null {
  const header = req.header("authorization");
  if (!header) return null;
  const [scheme, token] = header.split(" ", 2);
  if (scheme?.toLowerCase() !== "bearer" || !token) return null;
  return token;
}

export async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token = extractBearerToken(req);
  if (!token) {
    res.status(401).json({ error: "Missing access token" });
    return;
  }

  try {
    req.auth = await verifyAccessToken(token);
    next();
  } catch {
    res.status(401).json({ error: "Invalid access token" });
  }
}
