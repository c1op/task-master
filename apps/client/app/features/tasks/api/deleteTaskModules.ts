import { api } from "~/lib/api";
import { DeleteTaskModules } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksQueryKeys } from "../queryKeys";

export type DeleteTaskModulesParams = {
  id: string;
  data: DeleteTaskModules;
};

export const deleteTaskModules = async ({ id, data }: DeleteTaskModulesParams) =>
  await api.delete(`tasks/${id}/modules`, { json: data }).json();

export const useDeleteTaskModules = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTaskModules,
    onSuccess: async (_data, { id }) => {
      await queryClient.invalidateQueries({ queryKey: tasksQueryKeys.tasks });
      await queryClient.invalidateQueries({ queryKey: tasksQueryKeys.task(id) });
    },
  });
};
