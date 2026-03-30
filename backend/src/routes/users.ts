import express from "express";

import { requireAuth } from "../modules/auth/middleware/requireAuth.js";
import { createUser, listUsers } from "../modules/users/controllers/users.controller.js";

const usersRouter = express.Router();

usersRouter.get("/", requireAuth, listUsers);
usersRouter.post("/", requireAuth, createUser);

export default usersRouter;

