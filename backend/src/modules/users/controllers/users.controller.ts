import type { Request, Response } from "express";

import { CreateUserSchema, ListUsersQuerySchema } from "@/modules/users/utils/usersSchemas.js";
import { respondUsersError } from "@/modules/users/utils/respondUsersError.js";
import * as usersService from "@/modules/users/services/users.service.js";

const listUsers = async (req: Request, res: Response): Promise<void> => {
  const parsed = ListUsersQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request", details: parsed.error.flatten() });
    return;
  }

  try {
    const result = usersService.listUsers(parsed.data);
    res.json(result);
  } catch (err) {
    respondUsersError(res, err);
  }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  const parsed = CreateUserSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request", details: parsed.error.flatten() });
    return;
  }

  try {
    const user = usersService.createUser(parsed.data);
    res.status(201).json(user);
  } catch (err) {
    respondUsersError(res, err);
  }
};

export { listUsers, createUser };

