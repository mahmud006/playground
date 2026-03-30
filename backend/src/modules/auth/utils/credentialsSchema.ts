import { z } from "zod";

export const CredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(200),
});

export type CredentialsInput = z.infer<typeof CredentialsSchema>;
