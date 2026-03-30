export interface DashboardStat {
  id: string;
  label: string;
  value: string | number;
  change: number;
  trend: "up" | "down" | "flat";
}

export interface DashboardStatsResponse {
  stats: DashboardStat[];
}

export interface StatCardProps {
  label: string;
  value: string | number;
  change: number;
  trend: "up" | "down" | "flat";
}

export interface WelcomeBannerProps {
  userName: string;
}
