export const modulesQueryKeys = {
  modules: ["modules"] as const,
  module: (moduleId: string) => [...modulesQueryKeys.modules, moduleId] as const,
  moduleTasks: (moduleId: string) => [...modulesQueryKeys.module(moduleId), "tasks"] as const,
};
