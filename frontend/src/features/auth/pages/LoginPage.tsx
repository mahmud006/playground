import { useLocation, useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

import { LoginForm } from "../components/LoginForm.tsx";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const from =
    typeof location.state === "object" &&
    location.state !== null &&
    "from" in location.state &&
    typeof location.state.from === "string"
      ? location.state.from
      : "/";

  return (
    <Card sx={{ width: "100%", maxWidth: 420, boxShadow: 6 }}>
      <CardContent sx={{ p: 4 }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h4">Log in</Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              Access token stays in memory. Refresh token is stored in a httpOnly cookie.
            </Typography>
          </Box>
          <LoginForm onSuccess={() => navigate(from, { replace: true })} />
        </Stack>
      </CardContent>
    </Card>
  );
}
