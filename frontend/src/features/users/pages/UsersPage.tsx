import { Box, Typography } from "@mui/material";

import { UsersTable } from "../components/UsersTable.tsx";
import { useUsers } from "../services/usersService.ts";

export function UsersPage() {
  const { data: users, isLoading } = useUsers();

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h4">Users</Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          Manage team members and their permissions.
        </Typography>
      </Box>

      <UsersTable users={users ?? []} isLoading={isLoading} />
    </Box>
  );
}
