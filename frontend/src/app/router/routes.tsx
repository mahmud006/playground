import type { RouteObject } from 'react-router-dom';

import { HomeView } from '../../features/auth/ui/HomeView';
import { LoginView } from '../../features/auth/ui/LoginView';
import { SignupView } from '../../features/auth/ui/SignupView';
import { RedirectAuthedHome, RequireAuth } from '../auth/hooks';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <RequireAuth>
        <HomeView />
      </RequireAuth>
    ),
  },
  {
    path: '/login',
    element: (
      <RedirectAuthedHome>
        <LoginView />
      </RedirectAuthedHome>
    ),
  },
  {
    path: '/signup',
    element: (
      <RedirectAuthedHome>
        <SignupView />
      </RedirectAuthedHome>
    ),
  },
];
