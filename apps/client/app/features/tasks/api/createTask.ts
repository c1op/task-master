import { api } from "~/lib/api";
import { NewTask, Task } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksQueryKeys } from "../queryKeys";

export const createTask = async (newTask: NewTask) =>
  await api.post("tasks", { json: newTask }).json<Task>();

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: tasksQueryKeys.tasks });
    },
  });
};
