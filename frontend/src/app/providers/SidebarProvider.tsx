import { useCallback, useMemo, useState, type ReactNode } from "react";

import { SidebarContext } from "./SidebarContext.ts";
import type { SidebarContextValue } from "./SidebarContext.ts";

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true);

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);

  const value = useMemo<SidebarContextValue>(
    () => ({ open, toggle, close }),
    [open, toggle, close],
  );

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}
