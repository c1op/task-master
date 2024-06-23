import { z } from "zod";
import { tasks } from "~/db/schema";

export type Task = typeof tasks.$inferSelect;

export type TaskStatus = z.infer<typeof taskStatusSchema>;
export const taskStatusSchema = z.enum(["todo", "in_progress", "done"]);

export type TaskDto = {
  id: string;
  title: string;
  status: TaskStatus;
  modules: TaskModuleDto[];
  labels: string[];
  createdAt: number;
  updatedAt: number;
  dueAt: number | null;
  content: string | null;
};

export type TaskModuleDto = {
  id: string;
  title: string;
};
