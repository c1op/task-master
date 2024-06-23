import { api } from "~/lib/api";
import { Task } from "../types";
import { useQuery } from "@tanstack/react-query";
import { tasksQueryKeys } from "../queryKeys";

export type UseTaskParams = {
  id: string;
};

export type GetTaskParams = {
  id: string;
};

export const getTask = async ({ id }: GetTaskParams) => {
  return await api.get(`tasks/${id}`).json<Task>();
};

export const useTask = ({ id }: UseTaskParams) => {
  return useQuery({ queryKey: tasksQueryKeys.task(id), queryFn: () => getTask({ id }) });
};
