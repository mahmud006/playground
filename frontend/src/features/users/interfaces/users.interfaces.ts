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
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  role: UserListItem["role"];
  status: UserListItem["status"];
}

export interface AddUserFormProps {
  isSubmitting: boolean;
  onSubmit: (payload: CreateUserRequest) => Promise<void> | void;
}

export interface UsersTableProps {
  users: UserListItem[];
  isLoading: boolean;
}
