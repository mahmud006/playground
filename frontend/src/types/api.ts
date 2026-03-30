/**
 * Standard API envelope returned by the backend.
 * The Axios response interceptor unwraps this so services receive `T` directly.
 */
export interface ServiceResponse<T = unknown> {
  data: T;
  success: boolean;
  message: string;
}

export interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export type PaginatedResponse<T> = ServiceResponse<PaginatedData<T>>;

export interface ApiErrorResponse {
  success: false;
  message: string;
  error: string;
  details?: unknown;
}

export type AuthStatus = "loading" | "anonymous" | "authenticated";
