import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

import { SignupForm } from "../components/SignupForm.tsx";

export function SignupPage() {
  const navigate = useNavigate();

  return (
    <Card sx={{ width: "100%", maxWidth: 420, boxShadow: 6 }}>
      <CardContent sx={{ p: 4 }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h4">Create account</Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              Sign up to get started with the dashboard.
            </Typography>
          </Box>
          <SignupForm onSuccess={() => navigate("/", { replace: true })} />
        </Stack>
      </CardContent>
    </Card>
  );
}
