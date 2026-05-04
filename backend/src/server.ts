import express, { type Request, type Response } from "express";
import cookieParser from "cookie-parser";

import { API_V1_PREFIX } from "./constants/api.js";
import { env } from "./env.js";
import authRouter from "./routes/authRoutes.js";
import { meRouter } from "./routes/me.js";
import usersRouter from "./routes/users.js";
import notesRouter from "./routes/notes.js";

const app = express();
const PORT = env.PORT;

app.use(express.json());
app.use(cookieParser());

app.get(`${API_V1_PREFIX}/health`, (_req: Request, res: Response) => {
  res.json({ ok: true });
});

app.use(`${API_V1_PREFIX}/auth`, authRouter);
app.use(`${API_V1_PREFIX}/profile`, meRouter);
app.use(`${API_V1_PREFIX}/users`, usersRouter);
app.use(`${API_V1_PREFIX}/notes`, notesRouter);

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});

