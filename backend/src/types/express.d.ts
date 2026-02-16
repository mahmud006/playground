import type { AccessTokenClaims } from "../auth/jwt.js";

declare global {
  namespace Express {
    interface Request {
      auth?: AccessTokenClaims;
    }
  }
}

export {};

