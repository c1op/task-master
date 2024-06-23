export const tasksQueryKeys = {
  tasks: ["tasks"] as const,
  task: (id: string) => ["tasks", id] as const,
};
