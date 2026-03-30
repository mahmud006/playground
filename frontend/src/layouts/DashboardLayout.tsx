import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import { TOPBAR_HEIGHT } from '@/config/constants.ts';
import { Sidebar } from "./components/Sidebar.tsx";
import { Topbar } from "./components/Topbar.tsx";

export function DashboardLayout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Topbar />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          mt: `${TOPBAR_HEIGHT}px`,
          p: 3,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
