import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { queryClient } from "@/config/queryClient.ts";
import { ThemeModeProvider } from "./ThemeModeProvider.tsx";
import { SidebarProvider } from "./SidebarProvider.tsx";
import { AuthProvider } from "@/app/auth/AuthProvider.tsx";
import { NotificationProvider } from "@/components/NotificationProvider.tsx";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeModeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <SidebarProvider>
              <NotificationProvider>
                {children}
              </NotificationProvider>
            </SidebarProvider>
          </AuthProvider>
        </BrowserRouter>
        <ReactQueryDevtools buttonPosition="bottom-left" />
      </QueryClientProvider>
    </ThemeModeProvider>
  );
}
