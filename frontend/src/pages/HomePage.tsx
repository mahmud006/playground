import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";

import { useAuth } from "../app/auth/hooks";

export function HomePage() {
  const { user, logout } = useAuth();

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" px={2}>
      <Box maxWidth={900} width="100%">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2.5} flexWrap="wrap" gap={1.5}>
          <Box>
            <Typography variant="h4" fontWeight={600}>
              Auth Playground
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              JWT access token in memory + rotating refresh token cookie
            </Typography>
          </Box>
          <Button variant="outlined" color="error" onClick={() => void logout()}>
            Logout
          </Button>
        </Stack>

        <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
          <CardContent sx={{ p: 3 }}>
            <Stack spacing={2}>
              <Typography variant="subtitle2" color="text.secondary">
                Current user
              </Typography>
              <Box
                component="pre"
                sx={{
                  m: 0,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "rgba(255,255,255,0.04)",
                  fontSize: 13,
                  overflowX: "auto",
                }}
              >
                {JSON.stringify(user, null, 2)}
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

