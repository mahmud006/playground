import { Box, Typography } from "@mui/material";

import type { WelcomeBannerProps } from "../interfaces/dashboard.interfaces.ts";

export function WelcomeBanner({ userName }: WelcomeBannerProps) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h4">
        {greeting}, {userName}
      </Typography>
      <Typography variant="body1" color="text.secondary" mt={0.5}>
        Here&apos;s what&apos;s happening with your project today.
      </Typography>
    </Box>
  );
}
