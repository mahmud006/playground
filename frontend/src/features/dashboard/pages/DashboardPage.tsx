import { Box, CircularProgress, Stack } from "@mui/material";

import { useAuth } from "@/hooks/useAuth.ts";
import { WelcomeBanner } from "../components/WelcomeBanner.tsx";
import { StatCard } from "../components/StatCard.tsx";
import { useDashboardStats } from "../services/dashboardService.ts";

export function DashboardPage() {
  const { user } = useAuth();
  const { data: stats, isLoading } = useDashboardStats();

  return (
    <Box>
      <WelcomeBanner userName={user?.email.split("@")[0] ?? "User"} />

      {isLoading ? (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      ) : (
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          {stats?.map((stat) => (
            <StatCard
              key={stat.id}
              label={stat.label}
              value={stat.value}
              change={stat.change}
              trend={stat.trend}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}
