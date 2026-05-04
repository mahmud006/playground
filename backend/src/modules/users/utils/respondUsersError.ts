import type { Response } from "express";

import { UsersServiceError } from "@/modules/users/utils/usersErrors.js";

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

