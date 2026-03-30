import { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";

import { useAuth } from "@/hooks/useAuth.ts";
import { useThemeMode } from "@/hooks/useThemeMode.ts";
import { ProfileSettings } from "../components/ProfileSettings.tsx";
import { AppearanceSettings } from "../components/AppearanceSettings.tsx";
import type { SettingsTab } from "../interfaces/settings.interfaces.ts";

export function SettingsPage() {
  const { user } = useAuth();
  const { mode, toggleMode } = useThemeMode();
  const [tab, setTab] = useState<SettingsTab>("profile");

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h4">Settings</Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          Manage your account and preferences.
        </Typography>
      </Box>

      <Tabs
        value={tab}
        onChange={(_, v: SettingsTab) => setTab(v)}
        sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}
      >
        <Tab label="Profile" value="profile" />
        <Tab label="Appearance" value="appearance" />
      </Tabs>

      {tab === "profile" && user ? (
        <ProfileSettings email={user.email} createdAt={user.createdAt} />
      ) : null}

      {tab === "appearance" ? (
        <AppearanceSettings mode={mode} onToggle={toggleMode} />
      ) : null}
    </Box>
  );
}
