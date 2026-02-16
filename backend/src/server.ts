import express, { type Request, type Response } from "express";
import cookieParser from "cookie-parser";

import { env } from "./env.js";
import { authRouter } from "./auth/routes.js";
import { meRouter } from "./routes/me.js";

const app = express();
const PORT = env.PORT;

app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req: Request, res: Response) => {
  res.json({ ok: true });
});

app.use("/auth", authRouter);
app.use("/me", meRouter);

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});

