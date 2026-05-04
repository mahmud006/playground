import { RequestType } from "@/lib/api/useDataQuery.ts";
import { useDataMutation } from "@/lib/api/useDataMutation.ts";

interface UpdateProfilePayload {
  email?: string;
}

export const useUpdateProfile = () =>
  useDataMutation<void, UpdateProfilePayload>({
    url: "/profile",
    requestType: RequestType.PATCH,
    invalidateKeys: [["profile"]],
    successMessage: "Profile updated",
  });
