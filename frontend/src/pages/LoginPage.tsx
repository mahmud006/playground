import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { ApiError } from "../lib/api";
import { useAuth } from "../state/auth/hooks";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const from = isRecord(location.state) && typeof location.state.from === "string" ? location.state.from : "/";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" px={2}>
      <Card sx={{ width: "100%", maxWidth: 420, boxShadow: 6, borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h4" fontWeight={600}>
                Log in
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                Access token stays in memory. Refresh token is stored in a httpOnly cookie.
              </Typography>
            </Box>

            {error ? <Alert severity="error">{error}</Alert> : null}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Stack spacing={2.5}>
                <TextField
                  label="Email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  size="small"
                  required
                />
                <TextField
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  size="small"
                  required
                />
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Button
                    type="submit"
                    variant="contained"
                    disableElevation
                    disabled={isSubmitting}
                    startIcon={isSubmitting ? <CircularProgress color="inherit" size={18} /> : null}
                  >
                    {isSubmitting ? "Logging in..." : "Log in"}
                  </Button>
                  <Typography variant="body2" color="text.secondary">
                    No account?{" "}
                    <Box component={Link} to="/signup" sx={{ color: "primary.main", textDecoration: "none" }}>
                      Sign up
                    </Box>
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

