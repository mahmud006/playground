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
  const sidebarWidth = open ? SIDEBAR_WIDTH : 0;
  const contentFadeDelay = open ? "120ms" : "0ms";

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sidebarWidth,
          boxSizing: "border-box",
          bgcolor: "background.default",
          borderRight: 1,
          borderColor: "divider",
          overflow: "hidden",
          willChange: "width",
          transition: (t) =>
            t.transitions.create("width", {
              easing: t.transitions.easing.sharp,
              duration: t.transitions.duration.leavingScreen,
            }),
        },
      }}
    >
      <Box
        sx={{
          p: open ? 2.5 : 1,
          pb: open ? 1.5 : 0.5,
          transition: (t) => t.transitions.create(["padding"], { duration: t.transitions.duration.leavingScreen }),
        }}
      >
        <Typography variant="h6" fontWeight={700} color="primary">
          <Box
            component="span"
            sx={{
              display: "inline-block",
              opacity: open ? 1 : 0,
              transition: (t) =>
                t.transitions.create("opacity", {
                  easing: t.transitions.easing.sharp,
                  duration: t.transitions.duration.leavingScreen,
                  delay: contentFadeDelay,
                }),
            }}
          >
            Playground
          </Box>
        </Typography>
        <Typography variant="caption" color="text.secondary">
          <Box
            component="span"
            sx={{
              display: "inline-block",
              opacity: open ? 1 : 0,
              transition: (t) =>
                t.transitions.create("opacity", {
                  easing: t.transitions.easing.sharp,
                  duration: t.transitions.duration.leavingScreen,
                  delay: contentFadeDelay,
                }),
              whiteSpace: "nowrap",
            }}
          >
            Enterprise Dashboard
          </Box>
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
                sx={{
                  m: 0,
                  opacity: open ? 1 : 0,
                  whiteSpace: "nowrap",
                  pointerEvents: open ? "auto" : "none",
                  transition: (t) =>
                    t.transitions.create("opacity", {
                      easing: t.transitions.easing.sharp,
                      duration: t.transitions.duration.leavingScreen,
                      delay: contentFadeDelay,
                    }),
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
}
