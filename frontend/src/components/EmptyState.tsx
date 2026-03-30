import { Box, Typography, type SxProps, type Theme } from "@mui/material";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  sx?: SxProps<Theme>;
}

export function EmptyState({ icon, title, description, action, sx }: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
        px: 3,
        textAlign: "center",
        ...sx,
      }}
    >
      {icon ? (
        <Box sx={{ mb: 2, color: "text.secondary", fontSize: 48 }}>{icon}</Box>
      ) : null}
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {description ? (
        <Typography variant="body2" color="text.secondary" maxWidth={400}>
          {description}
        </Typography>
      ) : null}
      {action ? <Box mt={2}>{action}</Box> : null}
    </Box>
  );
}
