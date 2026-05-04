import { useDataQuery } from "@/lib/api/useDataQuery.ts";
import { useDataMutation } from "@/lib/api/useDataMutation.ts";

import type {
  CreateUserRequest,
  UserListItem,
  UsersListResponse,
} from "../interfaces/users.interfaces.ts";

export const useUsers = (page: number, pageSize: number) =>
  useDataQuery<UsersListResponse>({
    url: "/users",
    params: { page, pageSize },
    queryKey: ["users", "list", page, pageSize],
    staleTime: 60_000,
  });

export const useCreateUser = () =>
  useDataMutation<UserListItem, CreateUserRequest>({
    url: "/users",
    invalidateKeys: [["users", "list"]],
    successMessage: "User created",
  });
