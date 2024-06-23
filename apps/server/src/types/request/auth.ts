import { z } from "zod";

export type LoginRequest = z.infer<typeof loginRequestSchema>;
export const loginRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const registerRequestSchema = z.object({ username: z.string(), password: z.string() });
