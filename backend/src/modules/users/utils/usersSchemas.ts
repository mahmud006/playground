import { z } from "zod";

export const RoleSchema = z.enum(["admin", "editor", "viewer"]);
export const StatusSchema = z.enum(["active", "inactive", "suspended"]);

export const CreateUserSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  role: RoleSchema.default("viewer"),
  status: StatusSchema.default("active"),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;

export const ListUsersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
});

export type ListUsersQuery = z.infer<typeof ListUsersQuerySchema>;

