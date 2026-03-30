import {
  useMutation,
  useQueryClient,
  type QueryKey,
  type UseMutationResult,
} from "@tanstack/react-query";

import { useNotification } from "@/hooks/useNotification.ts";
import { extractErrorMessage, type AppAxiosError } from "./types.ts";

interface UseDataMutationOptions<TData, TVariables> {
  /** Query keys to invalidate on success */
  invalidateKeys?: QueryKey[];
  /** Toast message on success (pass `false` to suppress) */
  successMessage?: string | false;
  /** Toast message on error (pass `false` to suppress, default: auto-extracted) */
  errorMessage?: string | false;
  /** Callback after success (runs after invalidation + toast) */
  onSuccess?: (data: TData, variables: TVariables) => void;
  /** Callback after error (runs after toast) */
  onError?: (error: AppAxiosError, variables: TVariables) => void;
}

/**
 * Generic wrapper around `useMutation`.
 *
 * Handles:
 * - Auto-invalidation of related query keys on success
 * - Auto-toast on success / error via NotificationProvider
 * - Consistent `AppAxiosError` typing
 *
 * @example
 * ```ts
 * export const useCreateUser = () =>
 *   useDataMutation<User, CreateUserPayload>(createUser, {
 *     invalidateKeys: [["users"]],
 *     successMessage: "User created",
 *   });
 * ```
 */
export function useDataMutation<TData = unknown, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseDataMutationOptions<TData, TVariables>,
): UseMutationResult<TData, AppAxiosError, TVariables> {
  const queryClient = useQueryClient();
  const { notify } = useNotification();

  const {
    invalidateKeys,
    successMessage,
    errorMessage,
    onSuccess,
    onError,
  } = options ?? {};

  return useMutation<TData, AppAxiosError, TVariables>({
    mutationFn,
    onSuccess: async (data, variables) => {
      if (invalidateKeys?.length) {
        await Promise.all(
          invalidateKeys.map((key) => queryClient.invalidateQueries({ queryKey: key })),
        );
      }

      if (successMessage !== false) {
        notify(successMessage ?? "Success", "success");
      }

      if (onSuccess) onSuccess(data, variables);
    },
    onError: (error, variables) => {
      if (errorMessage !== false) {
        notify(errorMessage ?? extractErrorMessage(error), "error");
      }

      if (onError) onError(error, variables);
    },
  });
}
