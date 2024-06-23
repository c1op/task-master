import { api } from "~/lib/api";
import { UpdateTaskModules } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksQueryKeys } from "../queryKeys";

export type UpdateTaskModulesParams = {
  id: string;
  data: UpdateTaskModules;
};

export const updateTaskModules = async ({ id, data }: UpdateTaskModulesParams) =>
  await api.put(`tasks/${id}/modules`, { json: data }).json();

export const useUpdateTaskModules = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTaskModules,
    onSuccess: async (_data, { id }) => {
      await queryClient.invalidateQueries({ queryKey: tasksQueryKeys.tasks });
      await queryClient.invalidateQueries({ queryKey: tasksQueryKeys.task(id) });
    },
  });
};
