import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import Brightness4Icon from "@mui/icons-material/Brightness4Outlined";
import Brightness7Icon from "@mui/icons-material/Brightness7Outlined";

import { SIDEBAR_WIDTH, TOPBAR_HEIGHT } from "@/config/constants.ts";
import { useAuth } from "@/hooks/useAuth.ts";
import { useSidebar } from "@/hooks/useSidebar.ts";
import { useThemeMode } from "@/hooks/useThemeMode.ts";

export function Topbar() {
  const { user, logout } = useAuth();
  const { open, toggle } = useSidebar();
  const { mode, toggleMode } = useThemeMode();
  const sidebarWidth = open ? SIDEBAR_WIDTH : 0;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        height: TOPBAR_HEIGHT,
        width: `calc(100% - ${sidebarWidth}px)`,
        ml: `${sidebarWidth}px`,
        bgcolor: "background.default",
        borderBottom: 1,
        borderColor: "divider",
        transition: (t) =>
          t.transitions.create(["width", "margin-left"], {
            easing: t.transitions.easing.sharp,
            duration: t.transitions.duration.leavingScreen,
          }),
      }}
    >
      <Toolbar sx={{ height: TOPBAR_HEIGHT, minHeight: TOPBAR_HEIGHT }}>
        <IconButton edge="start" onClick={toggle} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" spacing={1} alignItems="center">
          <Tooltip title={mode === "dark" ? "Light mode" : "Dark mode"}>
            <IconButton onClick={toggleMode} size="small">
              {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>

          {user && (
            <>
              <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main", fontSize: 14 }}>
                {user.email.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="body2" color="text.secondary" sx={{ display: { xs: "none", sm: "block" } }}>
                {user.email}
              </Typography>
            </>
          )}

          <Tooltip title="Logout">
            <IconButton onClick={() => void logout()} size="small" color="error">
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
