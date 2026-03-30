import { Card, CardContent, Stack, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

import type { StatCardProps } from "../interfaces/dashboard.interfaces.ts";

const TREND_CONFIG = {
  up: { icon: TrendingUpIcon, color: "success.main" },
  down: { icon: TrendingDownIcon, color: "error.main" },
  flat: { icon: TrendingFlatIcon, color: "text.secondary" },
} as const;

export function StatCard({ label, value, change, trend }: StatCardProps) {
  const { icon: TrendIcon, color } = TREND_CONFIG[trend];

  return (
    <Card
      sx={{
        flex: 1,
        minWidth: 200,
        border: 1,
        borderColor: "divider",
      }}
    >
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {label}
        </Typography>
        <Typography variant="h4" fontWeight={700}>
          {value}
        </Typography>
        <Stack direction="row" spacing={0.5} alignItems="center" mt={1}>
          <TrendIcon sx={{ fontSize: 18, color }} />
          <Typography variant="caption" color={color}>
            {change > 0 ? "+" : ""}
            {change}%
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
