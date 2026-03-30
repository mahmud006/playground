import { useContext } from "react";

import { AuthContext } from "@/app/auth/AuthContext.tsx";
import type { AuthContextValue } from "@/app/auth/types.ts";

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
