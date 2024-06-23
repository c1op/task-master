import { api } from "~/lib/api";
import { UpdateTaskLabels, UpdateTaskModules } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksQueryKeys } from "../queryKeys";

export type UpdateTaskLabelsParams = {
  id: string;
  data: UpdateTaskLabels;
};

export const updateTaskLabels = async ({ id, data }: UpdateTaskLabelsParams) =>
  await api.put(`tasks/${id}/labels`, { json: data }).json();

export const useUpdateTaskLabels = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTaskLabels,
    onSuccess: async (_data, { id }) => {
      await queryClient.invalidateQueries({ queryKey: tasksQueryKeys.tasks });
      await queryClient.invalidateQueries({ queryKey: tasksQueryKeys.task(id) });
    },
  });
};
