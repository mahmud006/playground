import { z } from "zod";

export const CreateNoteSchema = z.object({
  title: z.string().optional().nullable(),
  content: z.string().min(1, "Content is required"),
});

export type CreateNoteInput = z.infer<typeof CreateNoteSchema>;
