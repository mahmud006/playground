import api from "@/lib/api/axios.ts";
import { useDataMutation } from "@/lib/api/useDataMutation.ts";

interface UpdateProfilePayload {
  email?: string;
}

async function updateProfile(payload: UpdateProfilePayload): Promise<void> {
  await api.patch("/profile", payload);
}

export const useUpdateProfile = () =>
  useDataMutation<void, UpdateProfilePayload>(updateProfile, {
    invalidateKeys: [["profile"]],
    successMessage: "Profile updated",
  });
