import type { Response } from "express";

import { UsersServiceError } from "./usersErrors.js";

export function respondUsersError(res: Response, err: unknown): void {
  if (err instanceof UsersServiceError) {
    res.status(err.statusCode).json({
      error: err.message,
      ...(err.details !== undefined ? { details: err.details } : {}),
    });
    return;
  }

  throw err;
}

