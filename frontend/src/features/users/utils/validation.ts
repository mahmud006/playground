import { z } from "zod";

import type { CreateUserRequest } from "../interfaces/users.interfaces.ts";

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  email: z.string().email("Enter a valid email"),
  role: z.enum(["admin", "editor", "viewer"]),
  status: z.enum(["active", "inactive", "suspended"]),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;

export function toCreateUserRequest(data: CreateUserFormData): CreateUserRequest {
  return data;
}

