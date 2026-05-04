import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

import { configureAuth } from "@/lib/api/axios.ts";
import {
  loginUser,
  signupUser,
  logoutUser,
  refreshToken,
  fetchProfile,
} from "@/features/auth/services/authService.ts";
import { AuthContext } from "./AuthContext.tsx";
import type { AuthContextValue, AuthStatus } from "./types.ts";
import type { User } from "@/types/models.ts";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<User | null>(null);
  const [accessTokenState, setAccessTokenState] = useState<string | null>(null);
  const accessTokenRef = useRef<string | null>(null);
  const didInitRef = useRef(false);
  const location = useLocation();

  const setAccessToken = useCallback((token: string | null) => {
    accessTokenRef.current = token;
    setAccessTokenState(token);
  }, []);

  const refreshAccessToken = useCallback(async (): Promise<string | null> => {
    try {
      const result = await refreshToken();
      if (!result?.accessToken) {
        setAccessToken(null);
        return null;
      }
      setAccessToken(result.accessToken);
      return result.accessToken;
    } catch {
      setAccessToken(null);
      return null;
    }
  }, [setAccessToken]);

  useEffect(() => {
    configureAuth(
      () => accessTokenRef.current,
      refreshAccessToken,
    );
  }, [refreshAccessToken]);

  const loadMe = useCallback(
    async (token: string | null) => {
      if (!token) {
        setUser(null);
        setStatus("anonymous");
        return;
      }
      try {
        const { user: profile } = await fetchProfile(token);
        setUser(profile);
        setStatus("authenticated");
      } catch {
        setUser(null);
        setAccessToken(null);
        setStatus("anonymous");
      }
    },
    [setAccessToken],
  );

  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;

    const skipRefresh = location.pathname === "/login" || location.pathname === "/signup";

    void (async () => {
      try {
        const token = skipRefresh ? null : await refreshAccessToken();
        await loadMe(token);
      } catch {
        setUser(null);
        setAccessToken(null);
        setStatus("anonymous");
      }
    })();
  }, [location.pathname, loadMe, refreshAccessToken]);

  const signup = useCallback(
    async (email: string, password: string) => {
      const { accessToken } = await signupUser({ email, password });
      setAccessToken(accessToken);
      await loadMe(accessToken);
    },
    [loadMe, setAccessToken],
  );

  const login = useCallback(
    async (email: string, password: string) => {
      const { accessToken } = await loginUser({ email, password });
      setAccessToken(accessToken);
      await loadMe(accessToken);
    },
    [loadMe, setAccessToken],
  );

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);
      setAccessToken(null);
      setStatus("anonymous");
    }
  }, [setAccessToken]);

  const value = useMemo<AuthContextValue>(
    () => ({ status, user, accessToken: accessTokenState, signup, login, logout }),
    [status, user, accessTokenState, signup, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
