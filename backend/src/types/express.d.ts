import type { AccessTokenClaims } from "@/modules/auth/utils/jwt.js";

declare global {
  namespace Express {
    interface Request {
      auth?: AccessTokenClaims;
    }
  }
}

export {};

