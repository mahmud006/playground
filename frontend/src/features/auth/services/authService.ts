import api from "@/lib/api/axios.ts";
import { useDataMutation } from "@/lib/api/useDataMutation.ts";
import type {
  AuthTokenResponse,
  LoginRequest,
  SignupRequest,
  ProfileResponse,
} from "../interfaces/auth.interfaces.ts";

// ---------------------------------------------------------------------------
// Raw API functions (used by AuthProvider + mutation hooks)
// ---------------------------------------------------------------------------

export async function loginUser(data: LoginRequest): Promise<AuthTokenResponse> {
  const res = await api.post<AuthTokenResponse>("/auth/login", data);
  return res.data;
}

export async function signupUser(data: SignupRequest): Promise<AuthTokenResponse> {
  const res = await api.post<AuthTokenResponse>("/auth/signup", data);
  return res.data;
}

export async function logoutUser(): Promise<void> {
  await api.post("/auth/logout");
}

export async function refreshToken(): Promise<AuthTokenResponse | null> {
  const res = await api.post<AuthTokenResponse>("/auth/refresh");
  if (res.status === 204) return null;
  return res.data;
}

export async function fetchProfile(token: string): Promise<ProfileResponse> {
  const res = await api.get<ProfileResponse>("/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// ---------------------------------------------------------------------------
// Mutation hooks (for component-level use)
// ---------------------------------------------------------------------------

export const useLogin = () =>
  useDataMutation<AuthTokenResponse, LoginRequest>(loginUser, {
    successMessage: false,
    errorMessage: false,
  });

export const useSignup = () =>
  useDataMutation<AuthTokenResponse, SignupRequest>(signupUser, {
    successMessage: false,
    errorMessage: false,
  });

export const useLogout = () =>
  useDataMutation<void, void>(logoutUser, {
    successMessage: "Logged out",
  });
