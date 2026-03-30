import type { RouteObject } from "react-router-dom";

import { DashboardLayout } from "@/layouts/DashboardLayout.tsx";
import { AuthLayout } from "@/layouts/AuthLayout.tsx";
import { RequireAuth, RedirectAuthedHome } from "./guards.tsx";

import { DashboardPage } from "@/features/dashboard/pages/DashboardPage.tsx";
import { UsersPage } from "@/features/users/pages/UsersPage.tsx";
import { AddUserPage } from "@/features/users/pages/AddUserPage.tsx";
import { SettingsPage } from "@/features/settings/pages/SettingsPage.tsx";
import { LoginPage } from "@/features/auth/pages/LoginPage.tsx";
import { SignupPage } from "@/features/auth/pages/SignupPage.tsx";

export const routes: RouteObject[] = [
  {
    element: (
      <RequireAuth>
        <DashboardLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "users", element: <UsersPage /> },
      { path: "users/new", element: <AddUserPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
  {
    element: (
      <RedirectAuthedHome>
        <AuthLayout />
      </RedirectAuthedHome>
    ),
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
    ],
  },
];
