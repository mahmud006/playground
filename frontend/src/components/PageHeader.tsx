import { Box, Stack, Typography, type SxProps, type Theme } from "@mui/material";
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  sx?: SxProps<Theme>;
}

export function PageHeader({ title, subtitle, action, sx }: PageHeaderProps) {
  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      justifyContent="space-between"
      flexWrap="wrap"
      gap={1.5}
      sx={{ mb: 3, ...sx }}
    >
      <Box>
        <Typography variant="h4">{title}</Typography>
        {subtitle ? (
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            {subtitle}
          </Typography>
        ) : null}
      </Box>
      {action ?? null}
    </Stack>
  );
}
