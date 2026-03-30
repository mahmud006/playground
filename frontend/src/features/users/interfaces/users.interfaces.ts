export interface UserListItem {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "inactive" | "suspended";
  createdAt: string;
  lastLoginAt: string | null;
}

export interface UsersListResponse {
  users: UserListItem[];
  total: number;
}

export interface UsersTableProps {
  users: UserListItem[];
  isLoading: boolean;
}
