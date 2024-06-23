import { z } from "zod";

export const createLabelRequestSchema = z.object({
  name: z.string(),
});

export const updateLabelRequestSchema = z.object({ name: z.string().optional() });

export const updateTaskLabelsRequestSchema = z.object({ labels: z.array(z.string()) });

export const deleteTaskLabelsRequestSchema = z.object({ labels: z.array(z.string()) });
