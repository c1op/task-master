import { z } from "zod";
import { taskStatusSchema } from "../tasks";

export const createTaskRequestSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export const updateTaskRequestSchema = z.object({
  title: z.string().optional(),
  status: taskStatusSchema.optional(),
  dueAt: z.number().optional(),
  content: z.string().optional(),
});

export const updateTaskModulesRequestSchema = z.object({
  modules: z.array(z.string()),
});

export const deleteTaskModulesRequestSchema = z.object({
  modules: z.array(z.string()),
});
