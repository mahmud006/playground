import type { Request, Response } from "express";

import * as notesService from "../services/notes.service.js";
import type { CreateNoteResponse, NotesErrorBody, NotesListResponse } from "../types/notes.types.js";
import { CreateNoteSchema } from "../utils/notesSchemas.js";

function requireUserId(req: Request, res: Response): string | null {
  const userId = req.auth?.userId;
  if (!userId) {
    const body: NotesErrorBody = { error: "Unauthorized" };
    res.status(401).json(body);
    return null;
  }
  return userId;
}

const list = async (req: Request, res: Response): Promise<void> => {
  const userId = requireUserId(req, res);
  if (!userId) return;

  try {
    const notes: NotesListResponse = await notesService.getNotes(userId);
    res.json(notes);
  } catch (err) {
    console.error("List notes error:", err);
    const body: NotesErrorBody = { error: "Internal server error" };
    res.status(500).json(body);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  const userId = requireUserId(req, res);
  if (!userId) return;

  const parsed = CreateNoteSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request", details: parsed.error.flatten() });
    return;
  }

  try {
    const note = await notesService.createNote(userId, parsed.data);
    res.status(201).json(note);
  } catch (err) {
    console.error("Create note error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const remove = async (req: Request, res: Response): Promise<void> => {
  const userId = requireUserId(req, res);
  if (!userId) return;

  const idParam = req.params.id;
  const id = Array.isArray(idParam) ? idParam[0] : idParam;
  if (!id) {
    const body: NotesErrorBody = { error: "Missing note id" };
    res.status(400).json(body);
    return;
  }

  try {
    await notesService.deleteNote(id, userId);
    res.status(204).send();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const status = message.includes("not found") ? 404 : 500;
    const body: NotesErrorBody = { error: message };
    res.status(status).json(body);
  }
};

export { list, create, remove };
