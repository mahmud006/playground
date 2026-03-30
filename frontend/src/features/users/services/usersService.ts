import api from "@/lib/api/axios.ts";
import { useDataQuery } from "@/lib/api/useDataQuery.ts";
import { useDataMutation } from "@/lib/api/useDataMutation.ts";

import type {
  CreateUserRequest,
  UserListItem,
  UsersListResponse,
} from "../interfaces/users.interfaces.ts";

async function fetchUsers(page: number, pageSize: number): Promise<UsersListResponse> {
  const res = await api.get<UsersListResponse>("/users", { params: { page, pageSize } });
  return res.data;
}

export const useUsers = (page: number, pageSize: number) =>
  useDataQuery<UsersListResponse>(
    ["users", "list", page, pageSize],
    () => fetchUsers(page, pageSize),
    { staleTime: 60_000 }
  );

async function createUser(payload: CreateUserRequest): Promise<UserListItem> {
  const res = await api.post<UserListItem>("/users", payload);
  return res.data;
}

export const useCreateUser = () =>
  useDataMutation<UserListItem, CreateUserRequest>(createUser, {
    invalidateKeys: [["users", "list"]],
    successMessage: "User created",
  });
