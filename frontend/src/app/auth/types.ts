export type User = {
  id: string;
  email: string;
  createdAt: string;
};

export type AuthStatus = "loading" | "anonymous" | "authenticated";

export type AuthContextValue = {
  status: AuthStatus;
  user: User | null;
  accessToken: string | null;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchWithAuthJson: <T,>(path: string, init?: RequestInit) => Promise<T>;
};

