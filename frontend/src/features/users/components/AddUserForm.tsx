import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import { createUserSchema, type CreateUserFormData } from "../utils/validation.ts";
import type { AddUserFormProps, CreateUserRequest, UserListItem } from "../interfaces/users.interfaces.ts";

const ROLE_OPTIONS: UserListItem["role"][] = ["admin", "editor", "viewer"];
const STATUS_OPTIONS: UserListItem["status"][] = ["active", "inactive", "suspended"];

export function AddUserForm({ isSubmitting, onSubmit }: AddUserFormProps) {
  const [form, setForm] = useState<CreateUserFormData>({
    name: "",
    email: "",
    role: "viewer",
    status: "active",
  });

  const [error, setError] = useState<string | null>(null);

  const roleValue = useMemo(() => form.role, [form.role]);
  const statusValue = useMemo(() => form.status, [form.status]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const parsed = createUserSchema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    await onSubmit(parsed.data as CreateUserRequest);
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={2.5}>
        {error ? <Alert severity="error">{error}</Alert> : null}

        <TextField
          label="Full name"
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          fullWidth
          required
          disabled={isSubmitting}
        />

        <TextField
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          fullWidth
          required
          disabled={isSubmitting}
        />

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              label="Role"
              value={roleValue}
              onChange={(e) => {
                const next = e.target.value;
                setForm((prev) => ({ ...prev, role: next as UserListItem["role"] }));
              }}
              disabled={isSubmitting}
            >
              {ROLE_OPTIONS.map((r) => (
                <MenuItem key={r} value={r}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              label="Status"
              value={statusValue}
              onChange={(e) => {
                const next = e.target.value;
                setForm((prev) => ({ ...prev, status: next as UserListItem["status"] }));
              }}
              disabled={isSubmitting}
            >
              {STATUS_OPTIONS.map((s) => (
                <MenuItem key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <Box>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            disableElevation
            startIcon={isSubmitting ? <CircularProgress color="inherit" size={18} /> : undefined}
          >
            {isSubmitting ? "Creating..." : "Create user"}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

