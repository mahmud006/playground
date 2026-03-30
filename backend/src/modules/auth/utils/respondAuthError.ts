import type { Response } from "express";

import { AuthServiceError } from "./authErrors.js";

/** Maps `AuthServiceError` to JSON; rethrows anything else. */
export function respondAuthError(res: Response, err: unknown): void {
  if (err instanceof AuthServiceError) {
    res.status(err.statusCode).json({
      error: err.message,
      ...(err.details !== undefined ? { details: err.details } : {}),
    });
    return;
  }
  throw err;
}
