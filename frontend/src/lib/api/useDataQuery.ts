import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";

import api from "./axios.ts";
import type { AppAxiosError } from "./types.ts";

export const RequestType = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
} as const;

export type RequestType = (typeof RequestType)[keyof typeof RequestType];

interface DataQueryConfig<T> {
  url: string;
  requestType?: RequestType;
  queryKey?: QueryKey;
  body?: Record<string, unknown>;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  enabled?: boolean;
  staleTime?: number;
  gcTime?: number;
  /** Pass a custom fetcher to bypass the built-in axios call */
  queryFn?: () => Promise<T>;
}

type ExtraQueryOptions<T> = Omit<
  UseQueryOptions<T, AppAxiosError, T, QueryKey>,
  "queryKey" | "queryFn" | "enabled" | "staleTime" | "gcTime"
>;

/**
 * Config-driven wrapper around `useQuery`.
 *
 * Supports GET (with params) and POST (with body) out of the box.
 * Auto-generates a stable query key from `url + params/body` when `queryKey` is omitted.
 *
 * @example
 * ```ts
 * // Simple GET
 * export const useUsers = (page: number, pageSize: number) =>
 *   useDataQuery<UsersListResponse>({
 *     url: "/users",
 *     params: { page, pageSize },
 *     staleTime: 60_000,
 *   });
 *
 * // GET with explicit query key
 * export const useProfile = () =>
 *   useDataQuery<Profile>({
 *     url: "/profile",
 *     queryKey: ["profile"],
 *   });
 *
 * // POST query (search / filter)
 * export const useSearchResults = (filters: Filters) =>
 *   useDataQuery<SearchResult[]>({
 *     url: "/search",
 *     requestType: RequestType.POST,
 *     body: filters,
 *   });
 *
 * // Custom fetcher (mock / non-axios)
 * export const useDashboardStats = () =>
 *   useDataQuery<DashboardStat[]>({
 *     url: "/dashboard/stats",
 *     queryFn: fetchMockStats,
 *     staleTime: 60_000,
 *   });
 * ```
 */
export function useDataQuery<T>(
  config: DataQueryConfig<T>,
  options?: ExtraQueryOptions<T>,
): UseQueryResult<T, AppAxiosError> {
  const {
    url,
    requestType = RequestType.GET,
    body = {},
    params = {},
    headers = {},
    enabled = true,
    staleTime,
    gcTime,
    queryFn: customQueryFn,
  } = config;

  const queryKey: QueryKey = config.queryKey ?? [
    url,
    ...(Object.keys(params).length > 0 ? [params] : []),
    ...(Object.keys(body).length > 0 ? [body] : []),
  ];

  const queryFn: () => Promise<T> = customQueryFn ?? (async () => {
    const axiosConfig = {
      ...(Object.keys(headers).length > 0 && { headers }),
      ...(requestType === RequestType.GET && Object.keys(params).length > 0 && { params }),
    };

    switch (requestType) {
      case RequestType.GET: {
        const res = await api.get<T>(url, axiosConfig);
        return res.data;
      }
      case RequestType.POST: {
        const res = await api.post<T>(url, body, axiosConfig);
        return res.data;
      }
      default:
        throw new Error(`useDataQuery: unsupported requestType "${String(requestType)}"`);
    }
  });

  return useQuery<T, AppAxiosError, T, QueryKey>({
    queryKey,
    queryFn,
    enabled,
    staleTime,
    gcTime,
    ...options,
  });
}
