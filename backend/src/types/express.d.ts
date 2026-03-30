import type { AccessTokenClaims } from "../modules/auth/utils/jwt.ts";

declare global {
  namespace Express {
    interface Request {
      auth?: AccessTokenClaims;
    }
  }
}

export {};

