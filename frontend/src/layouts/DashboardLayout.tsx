import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import { SIDEBAR_WIDTH, TOPBAR_HEIGHT } from "@/config/constants.ts";
import { useSidebar } from "@/hooks/useSidebar.ts";
import { Sidebar } from "./components/Sidebar.tsx";
import { Topbar } from "./components/Topbar.tsx";

export function DashboardLayout() {
  const { open } = useSidebar();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Topbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: `${TOPBAR_HEIGHT}px`,
          ml: open ? 0 : `-${SIDEBAR_WIDTH}px`,
          p: 3,
          transition: (t) =>
            t.transitions.create("margin", {
              easing: t.transitions.easing.sharp,
              duration: t.transitions.duration.leavingScreen,
            }),
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
