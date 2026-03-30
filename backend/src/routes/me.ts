import { Router } from "express";

import { requireAuth } from "../modules/auth/middleware/requireAuth.js";
import { profile } from "../modules/auth/controllers/auth.controller.js";

export const meRouter = Router();

meRouter.get("/", requireAuth, profile);