import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/DashboardOutlined";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";

import { SIDEBAR_WIDTH } from "@/config/constants.ts";
import { useSidebar } from "@/hooks/useSidebar.ts";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", path: "/", icon: <DashboardIcon /> },
  { label: "Users", path: "/users", icon: <PeopleIcon /> },
  { label: "Settings", path: "/settings", icon: <SettingsIcon /> },
];

export function Sidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: open ? SIDEBAR_WIDTH : 0,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: SIDEBAR_WIDTH,
          boxSizing: "border-box",
          bgcolor: "background.default",
          borderRight: 1,
          borderColor: "divider",
        },
      }}
    >
      <Box sx={{ p: 2.5, pb: 1.5 }}>
        <Typography variant="h6" fontWeight={700} color="primary">
          Playground
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Enterprise Dashboard
        </Typography>
      </Box>

      <List sx={{ px: 1, mt: 1 }}>
        {NAV_ITEMS.map((item) => {
          const active = item.path === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(item.path);

          return (
            <ListItemButton
              key={item.path}
              selected={active}
              onClick={() => navigate(item.path)}
              sx={{
                mb: 0.5,
                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  "&:hover": { bgcolor: "primary.dark" },
                  "& .MuiListItemIcon-root": { color: "inherit" },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: "0.875rem", fontWeight: 500 }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
}
