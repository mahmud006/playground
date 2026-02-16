import type { ReactNode } from "react";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { AuthContext } from "./AuthContext";
import type { AuthContextValue } from "./types";

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function RequireAuth({ children }: { children: ReactNode }) {
  const { status } = useAuth();
  const location = useLocation();

  if (status === "loading") return null;
  if (status === "anonymous") return <Navigate to="/login" replace state={{ from: location.pathname }} />;

  return <>{children}</>;
}

export function RedirectAuthedHome({ children }: { children: ReactNode }) {
  const { status } = useAuth();
  if (status === "loading") return null;
  if (status === "authenticated") return <Navigate to="/" replace />;
  return <>{children}</>;
}

