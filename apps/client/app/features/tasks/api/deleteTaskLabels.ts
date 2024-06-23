import { api } from "~/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksQueryKeys } from "../queryKeys";
import { DeleteTaskLabels } from "../types";

export type DeleteTaskLabelsParams = {
  id: string;
  data: DeleteTaskLabels;
};

export const deleteTaskLabels = async ({ id, data }: DeleteTaskLabelsParams) =>
  await api.delete(`tasks/${id}/labels`, { json: data }).json();

export const useDeleteTaskLabels = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTaskLabels,
    onSuccess: async (_data, { id }) => {
      await queryClient.invalidateQueries({ queryKey: tasksQueryKeys.tasks });
      await queryClient.invalidateQueries({ queryKey: tasksQueryKeys.task(id) });
    },
  });
};
