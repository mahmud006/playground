export interface Note {
  id: string;
  title: string | null;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface CreateNoteRequest {
  title?: string | null;
  content: string;
}
