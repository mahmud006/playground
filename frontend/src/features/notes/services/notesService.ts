import api from "@/lib/api/axios.ts";
import { useDataQuery } from "@/lib/api/useDataQuery.ts";
import { useDataMutation } from "@/lib/api/useDataMutation.ts";
import type { Note, CreateNoteRequest } from "../interfaces/notes.interfaces.ts";

export const useNotes = () =>
  useDataQuery<Note[]>({
    url: "/notes",
    queryKey: ["notes", "list"],
  });

export const useCreateNote = () =>
  useDataMutation<Note, CreateNoteRequest>({
    url: "/notes",
    invalidateKeys: [["notes", "list"]],
    successMessage: "Note created successfully",
  });

export const useDeleteNote = () =>
  useDataMutation<void, string>(
    (id: string) => api.delete(`/notes/${id}`).then((res) => res.data),
    {
      invalidateKeys: [["notes", "list"]],
      successMessage: "Note deleted",
    }
  );
