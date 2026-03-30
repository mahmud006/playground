import { useState } from "react";
import { Box, Button, TablePagination, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { UsersTable } from "../components/UsersTable.tsx";
import { useUsers } from "../services/usersService.ts";

export function UsersPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data, isLoading } = useUsers(page + 1, rowsPerPage);
  const users = data?.users ?? [];
  const total = data?.total ?? 0;

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h4">Users</Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          Manage team members and their permissions.
        </Typography>

        <Box mt={2}>
          <Button variant="contained" onClick={() => navigate("/users/new")}>
            Add user
          </Button>
        </Box>
      </Box>

      <UsersTable users={users ?? []} isLoading={isLoading} />

      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={(_, nextPage) => setPage(nextPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(Number(e.target.value));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
}
