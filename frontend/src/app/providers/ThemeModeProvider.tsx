import { useCallback, useMemo, useState, type ReactNode } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";

import { buildTheme } from "@/config/theme.ts";
import { ThemeModeContext } from "./ThemeModeContext.ts";
import type { ThemeModeContextValue } from "./ThemeModeContext.ts";

function getInitialMode(): "light" | "dark" {
  try {
    const stored = localStorage.getItem("theme-mode");
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* restricted storage */
  }
  return "dark";
}

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">(getInitialMode);

  const toggleMode = useCallback(() => {
    setMode((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try { localStorage.setItem("theme-mode", next); } catch { /* noop */ }
      return next;
    });
  }, []);

  const theme = useMemo(() => buildTheme(mode), [mode]);

  const value = useMemo<ThemeModeContextValue>(
    () => ({ mode, toggleMode }),
    [mode, toggleMode],
  );

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
