import { z } from "zod";

import "dotenv/config";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  DATABASE_URL: z.string().min(1),

  ACCESS_TOKEN_SECRET: z.string().min(16),
  REFRESH_TOKEN_SECRET: z.string().min(16),

  ACCESS_TOKEN_TTL_SECONDS: z.coerce.number().int().min(60).max(60 * 60 * 24).default(15 * 60),
  REFRESH_TOKEN_TTL_DAYS: z.coerce.number().int().min(1).max(365).default(14),
});

export type Env = z.infer<typeof EnvSchema>;

export const env: Env = EnvSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_TTL_SECONDS: process.env.ACCESS_TOKEN_TTL_SECONDS,
  REFRESH_TOKEN_TTL_DAYS: process.env.REFRESH_TOKEN_TTL_DAYS,
});

