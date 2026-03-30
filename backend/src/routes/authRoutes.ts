import express from "express";

import { login, logout, refresh, signup } from "../modules/auth/controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/refresh", refresh);
authRouter.post("/logout", logout);

export default authRouter;
