import { randomUUID } from "node:crypto";

import type { CreateUserInput, ListUsersQuery } from "../utils/usersSchemas.js";
import { UsersServiceError } from "../utils/usersErrors.js";

export type TeamUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "inactive" | "suspended";
  createdAt: string;
  lastLoginAt: string | null;
};

const seededUsers: TeamUser[] = [
  // Intentionally empty: start with no users and let POST /api/v1/users populate.
];

let users: TeamUser[] = [];

function toISOStringDate(d: Date): string {
  return d.toISOString();
}

export const usersRepository = {
  list({ page, pageSize }: ListUsersQuery): {
    users: TeamUser[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  } {
    const total = users.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const safePage = Math.min(page, totalPages);

    const start = (safePage - 1) * pageSize;
    const end = start + pageSize;
    return {
      users: users.slice(start, end),
      total,
      page: safePage,
      pageSize,
      totalPages,
    };
  },

  findByEmail(email: string): TeamUser | null {
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
  },

  create(input: CreateUserInput): TeamUser {
    const existing = usersRepository.findByEmail(input.email);
    if (existing) {
      throw new UsersServiceError("Email already in use", 409);
    }

    const now = new Date();
    const created: TeamUser = {
      id: randomUUID(),
      name: input.name,
      email: input.email,
      role: input.role,
      status: input.status,
      createdAt: toISOStringDate(now),
      lastLoginAt: null,
    };

    users = [created, ...users];
    return created;
  },
};

