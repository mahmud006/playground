import express from "express";
import { requireAuth } from "@/modules/auth/middleware/requireAuth.js";
import { list, create, remove } from "@/modules/notes/controllers/notes.controller.js";

const notesRouter = express.Router();

notesRouter.get("/", requireAuth, list);
notesRouter.post("/", requireAuth, create);
notesRouter.delete("/:id", requireAuth, remove);

export default notesRouter;
