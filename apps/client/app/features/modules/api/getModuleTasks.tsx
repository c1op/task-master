import { useQueries, useQuery } from "@tanstack/react-query";
import { Task } from "~/features/tasks";
import { api } from "~/lib/api";
import { modulesQueryKeys } from "../queryKeys";

export const getModuleTasks = async (id: string) =>
  await api.get(`modules/${id}/tasks`).json<Task[]>();

export const useModuleTasks = (moduleId: string) => {
  return useQuery({
    queryKey: modulesQueryKeys.moduleTasks(moduleId),
    queryFn: () => getModuleTasks(moduleId),
  });
};
