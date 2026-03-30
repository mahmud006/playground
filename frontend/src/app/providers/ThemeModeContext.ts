import { createContext } from "react";

export interface ThemeModeContextValue {
  mode: "light" | "dark";
  toggleMode: () => void;
}

export const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);
