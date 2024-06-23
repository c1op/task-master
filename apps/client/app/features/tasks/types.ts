import { z } from "zod";

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  labels: string[];
  modules: TaskModule[];
  createdAt: number;
  updatedAt: number;
  dueAt: number | null;
  content: string | null;
};

export type TaskModule = {
  id: string;
  title: string;
};

export type NewTask = {
  title: string;
  content: string;
};

export type UpdateTask = {
  title?: string;
  status?: TaskStatus;
  dueAt?: number | null;
  content?: string | null;
};

export type UpdateTaskModules = {
  modules: string[];
};

export type DeleteTaskModules = UpdateTaskModules;

export type UpdateTaskLabels = {
  labels: string[];
};
export type DeleteTaskLabels = UpdateTaskLabels;

export type TaskStatus = z.infer<typeof taskStatusSchema>;
export const taskStatusSchema = z.enum(["todo", "in_progress", "done"]);

export type CreateTaskFormData = z.infer<typeof createTaskFormSchema>;
export const createTaskFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string(),
});

export type EditTaskFormData = z.infer<typeof editTaskFormSchema>;
export const editTaskFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string(),
});
