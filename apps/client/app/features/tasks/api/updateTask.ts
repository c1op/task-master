import { api } from "~/lib/api";
import { NewTask, Task, UpdateTask } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksQueryKeys } from "../queryKeys";
export type UpdateTaskParams = {
  id: string;
  data: UpdateTask;
};

export const updateTask = async ({ id, data }: UpdateTaskParams) =>
  await api.put(`tasks/${id}`, { json: data }).json<Task>();

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: tasksQueryKeys.tasks, exact: true });
      await queryClient.invalidateQueries({ queryKey: tasksQueryKeys.task(data.id) });
    },
  });
};
