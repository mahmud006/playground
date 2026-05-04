import { notesRepository } from "../repositories/notes.repository.js";
import type { CreateNoteResponse, NotesListResponse } from "../types/notes.types.js";
import { toNoteResource } from "../utils/noteMapper.js";
import type { CreateNoteInput } from "../utils/notesSchemas.js";

export async function getNotes(userId: string): Promise<NotesListResponse> {
  const rows = await notesRepository.listForUser(userId);
  return rows.map(toNoteResource);
}

export async function createNote(userId: string, data: CreateNoteInput): Promise<CreateNoteResponse> {
  const row = await notesRepository.create(userId, data);
  return toNoteResource(row);
}

export async function findNoteById(id: string, userId: string) {
  return notesRepository.findById(id, userId);
}

export async function deleteNote(id: string, userId: string) {
  const note = await notesRepository.findById(id, userId);
  if (!note) {
    throw new Error("Note not found or unauthorized");
  }
  await notesRepository.delete(id, userId);
}
