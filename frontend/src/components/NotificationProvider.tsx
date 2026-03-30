import { useCallback, useMemo, useState, type ReactNode } from "react";
import { Alert, Snackbar, type AlertColor } from "@mui/material";

import { NotificationContext } from "./NotificationContext.ts";
import type { NotificationContextValue } from "./NotificationContext.ts";

interface Notification {
  id: number;
  message: string;
  severity: AlertColor;
}

let nextId = 0;

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notify = useCallback((message: string, severity: AlertColor = "info") => {
    const id = nextId++;
    setNotifications((prev) => [...prev, { id, message, severity }]);
  }, []);

  const success = useCallback((msg: string) => notify(msg, "success"), [notify]);
  const error = useCallback((msg: string) => notify(msg, "error"), [notify]);
  const warning = useCallback((msg: string) => notify(msg, "warning"), [notify]);
  const info = useCallback((msg: string) => notify(msg, "info"), [notify]);

  const handleClose = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const value = useMemo<NotificationContextValue>(
    () => ({ notify, success, error, warning, info }),
    [notify, success, error, warning, info],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {notifications.map((n, idx) => (
        <Snackbar
          key={n.id}
          open
          autoHideDuration={4000}
          onClose={() => handleClose(n.id)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          sx={{ bottom: { xs: `${24 + idx * 64}px !important` } }}
        >
          <Alert
            onClose={() => handleClose(n.id)}
            severity={n.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {n.message}
          </Alert>
        </Snackbar>
      ))}
    </NotificationContext.Provider>
  );
}
