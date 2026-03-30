import { createContext } from "react";
import type { AlertColor } from "@mui/material";

export interface NotificationContextValue {
  notify: (message: string, severity?: AlertColor) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
}

export const NotificationContext = createContext<NotificationContextValue | null>(null);
