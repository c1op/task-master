import { z } from "zod";

export const createModuleRequestSchema = z.object({
  title: z.string(),
});

export const updateModuleRequestSchema = z.object({
  title: z.string().optional(),
});
