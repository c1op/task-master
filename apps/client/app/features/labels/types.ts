import { z } from "zod";

export type Label = {
  id: string;
  name: string;
};

export type CreateLabel = {
  name: string;
};

export type CreateLabelFormData = z.infer<typeof createLabelFormSchema>;
export const createLabelFormSchema = z.object({ name: z.string().min(1, "Required") });
