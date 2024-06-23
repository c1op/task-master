import { z } from "zod";
import { modules, tasks } from "~/db/schema";

export type Module = typeof modules.$inferSelect;

export type ModuleDto = {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
};
