import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

import { AddUserForm } from "../components/AddUserForm.tsx";
import { useCreateUser } from "../services/usersService.ts";

export function AddUserPage() {
  const navigate = useNavigate();
  const createUser = useCreateUser();

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h4">Add user</Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          Create a new team member.
        </Typography>
      </Box>

      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Stack spacing={2.5}>
            <AddUserForm
              isSubmitting={createUser.isPending}
              onSubmit={async (payload) => {
                await createUser.mutateAsync(payload);
                navigate("/users");
              }}
            />
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

