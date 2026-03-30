import { useRoutes } from "react-router-dom";

import { routes } from "./routes.tsx";

export function AppRouter() {
  return useRoutes(routes);
}
