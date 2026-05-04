/**
 * API contract for a note — not tied to Prisma/client shapes.
 * Dates are ISO strings as serialized in JSON responses.
 */
export interface NoteResource {
  id: string;
  title: string | null;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

/** `GET /notes` response body. */
export type NotesListResponse = NoteResource[];

/** `POST /notes` response body. */
export type CreateNoteResponse = NoteResource;

/** Generic error JSON for this module. */
export type NotesErrorBody = {
  error: string;
  details?: unknown;
};
