import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useAuth } from "@/hooks/useAuth.ts";
import { extractErrorMessage } from "@/lib/api/types.ts";
import { loginSchema } from "../utils/validation.ts";
import type { LoginFormProps } from "../interfaces/auth.interfaces.ts";

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
      onSuccess?.();
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={2.5}>
        {error ? <Alert severity="error">{error}</Alert> : null}

        <TextField
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
        />
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress color="inherit" size={18} /> : null}
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </Button>
          <Typography variant="body2" color="text.secondary">
            No account?{" "}
            <Box
              component={Link}
              to="/signup"
              sx={{ color: "primary.main", textDecoration: "none" }}
            >
              Sign up
            </Box>
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
