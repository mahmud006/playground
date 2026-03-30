import {
  Avatar,
  Box,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import type { ProfileSettingsProps } from "../interfaces/settings.interfaces.ts";

export function ProfileSettings({ email, createdAt }: ProfileSettingsProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ width: 56, height: 56, bgcolor: "primary.main", fontSize: 22 }}>
              {email.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="subtitle1">{email}</Typography>
              <Typography variant="caption" color="text.secondary">
                Member since {formattedDate}
              </Typography>
            </Box>
          </Stack>

          <TextField label="Email" value={email} disabled fullWidth />

          <Typography variant="caption" color="text.secondary">
            Contact your administrator to update your email address.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
