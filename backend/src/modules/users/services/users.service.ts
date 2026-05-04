import type { CreateUserInput, ListUsersQuery } from "@/modules/users/utils/usersSchemas.js";

import { usersRepository } from "@/modules/users/repositories/users.repository.js";

export function listUsers(query: ListUsersQuery) {
  return usersRepository.list(query);
}

export function createUser(input: CreateUserInput) {
  return usersRepository.create(input);
}

