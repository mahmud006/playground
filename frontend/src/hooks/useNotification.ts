import { useContext } from "react";

import {
  NotificationContext,
  type NotificationContextValue,
} from "@/components/NotificationContext.ts";

export function useNotification(): NotificationContextValue {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotification must be used within <NotificationProvider>");
  return ctx;
}
