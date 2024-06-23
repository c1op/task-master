import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/lib/api";
import { tasksQueryKeys } from "../queryKeys";
import { modulesQueryKeys } from "~/features/modules/queryKeys";

export const deleteTask = async (taskId: string) => await api.delete(`tasks/${taskId}`);

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: tasksQueryKeys.tasks });
    },
  });
};
