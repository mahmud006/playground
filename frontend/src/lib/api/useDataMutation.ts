import {
  useMutation,
  useQueryClient,
  type QueryKey,
  type UseMutationResult,
} from "@tanstack/react-query";

import api from "./axios.ts";
import { useNotification } from "@/hooks/useNotification.ts";
import { extractErrorMessage, type AppAxiosError } from "./types.ts";
import { RequestType } from "./useDataQuery.ts";

interface DataMutationConfig<TData, TVariables> {
  url: string;
  requestType?: RequestType;
  headers?: Record<string, string>;
  mutationKey?: QueryKey;
  retry?: number;
  invalidateKeys?: QueryKey[];
  successMessage?: string | false;
  errorMessage?: string | false;
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: AppAxiosError, variables: TVariables) => void;
}

type MutationOptions<TData, TVariables> = Pick<
  DataMutationConfig<TData, TVariables>,
  "mutationKey" | "retry" | "invalidateKeys" | "successMessage" | "errorMessage" | "onSuccess" | "onError"
>;

async function executeMutation<TData, TVariables>(
  url: string,
  requestType: RequestType,
  variables: TVariables,
  headers: Record<string, string>,
): Promise<TData> {
  const axiosConfig = {
    ...(Object.keys(headers).length > 0 && { headers }),
  };

  switch (requestType) {
    case RequestType.GET: {
      const res = await api.get<TData>(url, axiosConfig);
      return res.data;
    }
    case RequestType.POST: {
      const res = await api.post<TData>(url, variables, axiosConfig);
      return res.data;
    }
    case RequestType.PUT: {
      const res = await api.put<TData>(url, variables, axiosConfig);
      return res.data;
    }
    case RequestType.PATCH: {
      const res = await api.patch<TData>(url, variables, axiosConfig);
      return res.data;
    }
    case RequestType.DELETE: {
      const res = await api.delete<TData>(url, axiosConfig);
      return res.data;
    }
    default:
      throw new Error(`useDataMutation: unsupported requestType "${String(requestType)}"`);
  }
}

/**
 * Config-driven wrapper around `useMutation`.
 *
 * **Two usage modes:**
 *
 * 1. **Config-driven** — pass url + requestType; the hook builds the axios call.
 *    Consumer calls `mutate(typedPayload)` directly.
 *
 * 2. **Custom mutationFn** — pass your own async function + options.
 *    Consumer calls `mutate(typedPayload)` as before.
 *
 * Both modes support auto-invalidation, auto-toast, retry, and consistent error typing.
 *
 * @example
 * ```ts
 * // Config-driven POST
 * export const useCreateUser = () =>
 *   useDataMutation<UserListItem, CreateUserRequest>({
 *     url: "/users",
 *     invalidateKeys: [["users", "list"]],
 *     successMessage: "User created",
 *   });
 * // usage: createUser.mutate({ name: "John", email: "john@test.com", role: "viewer", status: "active" })
 *
 * // Config-driven PATCH
 * export const useUpdateProfile = () =>
 *   useDataMutation<void, UpdateProfilePayload>({
 *     url: "/profile",
 *     requestType: RequestType.PATCH,
 *     invalidateKeys: [["profile"]],
 *     successMessage: "Profile updated",
 *   });
 *
 * // Config-driven DELETE (no body needed)
 * export const useDeleteUser = (id: string) =>
 *   useDataMutation<void, void>({
 *     url: `/users/${id}`,
 *     requestType: RequestType.DELETE,
 *     invalidateKeys: [["users", "list"]],
 *     successMessage: "User deleted",
 *   });
 *
 * // Custom mutationFn (non-standard cases)
 * export const useLogin = () =>
 *   useDataMutation<AuthTokenResponse, LoginRequest>(loginUser, {
 *     successMessage: false,
 *   });
 * ```
 */

// Overload 1: Config-driven (url + requestType)
export function useDataMutation<TData = unknown, TVariables = void>(
  config: DataMutationConfig<TData, TVariables>,
): UseMutationResult<TData, AppAxiosError, TVariables>;

// Overload 2: Custom mutationFn
export function useDataMutation<TData = unknown, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: MutationOptions<TData, TVariables>,
): UseMutationResult<TData, AppAxiosError, TVariables>;

// Implementation
export function useDataMutation<TData = unknown, TVariables = void>(
  configOrFn: DataMutationConfig<TData, TVariables> | ((variables: TVariables) => Promise<TData>),
  externalOptions?: MutationOptions<TData, TVariables>,
): UseMutationResult<TData, AppAxiosError, TVariables> {
  const queryClient = useQueryClient();
  const { notify } = useNotification();

  const isConfigDriven = typeof configOrFn !== "function";

  const opts: MutationOptions<TData, TVariables> = isConfigDriven
    ? configOrFn
    : (externalOptions ?? {});

  const {
    mutationKey,
    retry = 0,
    invalidateKeys,
    successMessage,
    errorMessage,
    onSuccess,
    onError,
  } = opts;

  const mutationFn: (variables: TVariables) => Promise<TData> = isConfigDriven
    ? (variables: TVariables) =>
        executeMutation<TData, TVariables>(
          configOrFn.url,
          configOrFn.requestType ?? RequestType.POST,
          variables,
          configOrFn.headers ?? {},
        )
    : configOrFn;

  return useMutation<TData, AppAxiosError, TVariables>({
    mutationFn,
    mutationKey,
    retry,
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
