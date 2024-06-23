import { z } from "zod";

export type Module = {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
};

export type NewModule = {
  title: string;
};

export type CreateModuleFormData = z.infer<typeof createModuleFormSchema>;
export const createModuleFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

export type EditModuleFormData = z.infer<typeof editModuleFormSchema>;
export const editModuleFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});
