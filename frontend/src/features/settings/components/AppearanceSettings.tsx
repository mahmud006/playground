import {
  Card,
  CardContent,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

import type { AppearanceSettingsProps } from "../interfaces/settings.interfaces.ts";

export function AppearanceSettings({ mode, onToggle }: AppearanceSettingsProps) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography variant="subtitle1">Theme</Typography>
          <FormControlLabel
            control={<Switch checked={mode === "dark"} onChange={onToggle} />}
            label={mode === "dark" ? "Dark mode" : "Light mode"}
          />
          <Typography variant="caption" color="text.secondary">
            Switch between light and dark themes. Your preference is saved locally.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
