export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface DashboardStat {
  label: string;
  value: string | number;
  change?: number;
  icon?: string;
}

export interface UserListItem {
  id: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "suspended";
  createdAt: string;
  lastLoginAt: string | null;
}
