import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { apiJson, ApiError } from "../api/http";
import { AuthContext } from "./AuthContext";
import type { AuthContextValue, AuthStatus, User } from "./types";
import { refreshAccessTokenOnce } from "./refresh";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<User | null>(null);
  const [accessTokenState, setAccessTokenState] = useState<string | null>(null);
  const accessTokenRef = useRef<string | null>(null);
  const didInitRefreshRef = useRef(false);

  const setAccessToken = useCallback((token: string | null) => {
    accessTokenRef.current = token;
    setAccessTokenState(token);
  }, []);

  const fetchWithAuthJson = useCallback(
    async <T,>(path: string, init?: RequestInit): Promise<T> => {
      const run = async (token: string | null): Promise<T> => {
        const headers = new Headers(init?.headers ?? {});
        if (token) headers.set("authorization", `Bearer ${token}`);
        return apiJson<T>(path, { ...init, headers });
      };

      try {
        return await run(accessTokenRef.current);
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) {
          const newToken = await refreshAccessTokenOnce(setAccessToken);
          if (!newToken) throw err;
          return await run(newToken);
        }
        throw err;
      }
    },
    [setAccessToken]
  );

  const loadMe = useCallback(
    async (token: string | null) => {
      if (!token) {
        setUser(null);
        setStatus("anonymous");
        return;
      }

      try {
        const me = await apiJson<{ user: User }>('/profile', {
          headers: { authorization: `Bearer ${token}` },
        });
        setUser(me.user);
        setStatus("authenticated");
      } catch {
        setUser(null);
        setAccessToken(null);
        setStatus("anonymous");
      }
    },
    [setAccessToken]
  );

  useEffect(() => {
    // React 18 StrictMode runs effects twice in development.
    // Guard so we don't spam `/auth/refresh` on mount during dev.
    if (didInitRefreshRef.current) return;
    didInitRefreshRef.current = true;

    (async () => {
      const token = await refreshAccessTokenOnce(setAccessToken);
      await loadMe(token);
    })();
  }, [loadMe, setAccessToken]);

  const signup = useCallback(
    async (email: string, password: string) => {
      const { accessToken: token } = await apiJson<{ accessToken: string }>("/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setAccessToken(token);
      await loadMe(token);
    },
    [loadMe, setAccessToken]
  );

  const login = useCallback(
    async (email: string, password: string) => {
      const { accessToken: token } = await apiJson<{ accessToken: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setAccessToken(token);
      await loadMe(token);
    },
    [loadMe, setAccessToken]
  );

  const logout = useCallback(async () => {
    try {
      await apiJson<unknown>("/auth/logout", { method: "POST" });
    } finally {
      setUser(null);
      setAccessToken(null);
      setStatus("anonymous");
    }
  }, [setAccessToken]);

  const value = useMemo<AuthContextValue>(
    () => ({ status, user, accessToken: accessTokenState, signup, login, logout, fetchWithAuthJson }),
    [status, user, accessTokenState, signup, login, logout, fetchWithAuthJson]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

