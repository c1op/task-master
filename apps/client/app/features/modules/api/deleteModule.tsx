import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/lib/api";
import { modulesQueryKeys } from "../queryKeys";
import { tasksQueryKeys } from "~/features/tasks";

export const deleteModule = async (moduleId: string) => await api.delete(`modules/${moduleId}`);

export const useDeleteModule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteModule,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: tasksQueryKeys.tasks });
      await queryClient.invalidateQueries({ queryKey: modulesQueryKeys.modules });
    },
  });
};
