import type { CreateUserInput, ListUsersQuery } from "../utils/usersSchemas.js";

import { usersRepository } from "../repositories/users.repository.js";

export function listUsers(query: ListUsersQuery) {
  return usersRepository.list(query);
}

export function createUser(input: CreateUserInput) {
  return usersRepository.create(input);
}

