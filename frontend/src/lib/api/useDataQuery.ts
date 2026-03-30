import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";

import api from "./axios.ts";
import type { AppAxiosError } from "./types.ts";

type QueryFnOrUrl<T> = string | (() => Promise<T>);

type UseDataQueryOptions<T> =
  Omit<UseQueryOptions<T, AppAxiosError, T, QueryKey>, "queryKey" | "queryFn">;

/**
 * Generic wrapper around `useQuery`.
 *
 * @param queryKey  - TanStack query key array
 * @param fnOrUrl  - Either a GET endpoint string (e.g. "/users") or an async function returning `T`
 * @param options   - Any `useQuery` option overrides + `showError`
 *
 * When `fnOrUrl` is a string the hook calls `api.get<T>(url)` automatically.
 *
 * @example
 * ```ts
 * // Minimal -- just a URL
 * export const useUsers = () =>
 *   useDataQuery<User[]>(["users"], "/users");
 *
 * // Custom fetcher
 * export const useDashboardStats = () =>
 *   useDataQuery<DashboardStat[]>(["dashboard", "stats"], fetchStats, { staleTime: 60_000 });
 * ```
 */
export function useDataQuery<T>(
  queryKey: QueryKey,
  fnOrUrl: QueryFnOrUrl<T>,
  options?: UseDataQueryOptions<T>,
): UseQueryResult<T, AppAxiosError> {
  const queryFn: () => Promise<T> =
    typeof fnOrUrl === "string"
      ? async () => {
          const res = await api.get<T>(fnOrUrl);
          return res.data;
        }
      : fnOrUrl;

  return useQuery<T, AppAxiosError, T, QueryKey>({
    queryKey,
    queryFn,
    ...options,
  });
}
