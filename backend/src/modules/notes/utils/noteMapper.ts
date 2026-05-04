import type { Note } from "@prisma/client";

import type { NoteResource } from "../types/notes.types.js";

export function toNoteResource(row: Note): NoteResource {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    userId: row.userId,
  };
}
