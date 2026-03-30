import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
  Typography,
} from "@mui/material";

import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";

import type { UsersTableProps, UserListItem } from "../interfaces/users.interfaces.ts";

const STATUS_COLOR: Record<UserListItem["status"], "success" | "default" | "error"> = {
  active: "success",
  inactive: "default",
  suspended: "error",
};

const ROLE_COLOR: Record<UserListItem["role"], "primary" | "secondary" | "default"> = {
  admin: "primary",
  editor: "secondary",
  viewer: "default",
};

function formatDate(iso: string | null): string {
  if (!iso) return "--";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function UsersTable({ users, isLoading }: UsersTableProps) {
  return (
    <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Joined</TableCell>
            <TableCell>Last Login</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 6 }).map((__, j) => (
                    <TableCell key={j}>
                      <Skeleton variant="text" width="80%" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : users.length === 0
              ? (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Box
                        sx={{
                          py: 6,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        <PersonOffOutlinedIcon sx={{ fontSize: 44, color: "text.secondary" }} />
                        <Typography variant="subtitle1">No users found</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Create a user to see them listed here.
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )
            : users.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip label={user.role} size="small" color={ROLE_COLOR[user.role]} variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Chip label={user.status} size="small" color={STATUS_COLOR[user.status]} />
                  </TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell>{formatDate(user.lastLoginAt)}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
