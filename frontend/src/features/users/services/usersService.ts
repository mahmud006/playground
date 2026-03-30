import { useDataQuery } from "@/lib/api/useDataQuery.ts";
import type { UserListItem } from "../interfaces/users.interfaces.ts";

const MOCK_USERS: UserListItem[] = [
  { id: "u1", name: "Alice Johnson", email: "alice@example.com", role: "admin", status: "active", createdAt: "2025-01-15T10:30:00Z", lastLoginAt: "2026-03-29T14:20:00Z" },
  { id: "u2", name: "Bob Smith", email: "bob@example.com", role: "editor", status: "active", createdAt: "2025-03-22T08:00:00Z", lastLoginAt: "2026-03-28T09:15:00Z" },
  { id: "u3", name: "Carol Williams", email: "carol@example.com", role: "viewer", status: "inactive", createdAt: "2025-06-10T16:45:00Z", lastLoginAt: "2026-02-10T11:00:00Z" },
  { id: "u4", name: "David Brown", email: "david@example.com", role: "editor", status: "active", createdAt: "2025-08-01T12:00:00Z", lastLoginAt: "2026-03-30T07:45:00Z" },
  { id: "u5", name: "Eve Davis", email: "eve@example.com", role: "viewer", status: "suspended", createdAt: "2025-11-20T09:30:00Z", lastLoginAt: null },
];

async function fetchUsers(): Promise<UserListItem[]> {
  await new Promise((r) => setTimeout(r, 500));
  return MOCK_USERS;
  // Real API: return (await api.get<UserListItem[]>("/users")).data;
}

export const useUsers = () =>
  useDataQuery<UserListItem[]>(["users"], fetchUsers, {
    staleTime: 60_000,
  });
