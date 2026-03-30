import { useDataQuery } from "@/lib/api/useDataQuery.ts";
import type { DashboardStat } from "../interfaces/dashboard.interfaces.ts";

const MOCK_STATS: DashboardStat[] = [
  { id: "1", label: "Total Users", value: "2,847", change: 12.5, trend: "up" },
  { id: "2", label: "Active Sessions", value: "1,423", change: -3.2, trend: "down" },
  { id: "3", label: "Revenue", value: "$48,250", change: 8.1, trend: "up" },
  { id: "4", label: "Conversion Rate", value: "3.24%", change: 0, trend: "flat" },
];

async function fetchDashboardStats(): Promise<DashboardStat[]> {
  await new Promise((r) => setTimeout(r, 600));
  return MOCK_STATS;
  // Real API: return (await api.get<DashboardStat[]>("/dashboard/stats")).data;
}

export const useDashboardStats = () =>
  useDataQuery<DashboardStat[]>(["dashboard", "stats"], fetchDashboardStats, {
    staleTime: 60_000,
  });
