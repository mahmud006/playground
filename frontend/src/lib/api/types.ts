import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/types/api.ts";

export type AppAxiosError = AxiosError<ApiErrorResponse>;

export function isAppAxiosError(error: unknown): error is AppAxiosError {
  return (
    typeof error === "object" &&
    error !== null &&
    "isAxiosError" in error &&
    (error as { isAxiosError: boolean }).isAxiosError === true
  );
}

export function extractErrorMessage(error: unknown, fallback = "Something went wrong"): string {
  if (isAppAxiosError(error)) {
    const data = error.response?.data;
    return data?.message ?? data?.error ?? error.message ?? fallback;
  }
  if (error instanceof Error) return error.message;
  return fallback;
}
