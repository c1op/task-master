import { api } from "~/lib/api";
import { Task } from "../types";
import { useQuery } from "@tanstack/react-query";
import { tasksQueryKeys } from "../queryKeys";

export const getTasks = async () => {
  return await api.get(`tasks`).json<Task[]>();
};

export const useTasks = () => {
  return useQuery({ queryKey: tasksQueryKeys.tasks, queryFn: getTasks });
};
