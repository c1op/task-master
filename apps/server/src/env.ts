import { z } from "zod";
import "dotenv/config";

export const envSchema = z.object({
  JWT_SECRET: z.string(),

  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_NAME: z.string(),
});

export const env = envSchema.parse(process.env);
