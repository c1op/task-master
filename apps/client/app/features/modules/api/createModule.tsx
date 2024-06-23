import { api } from "~/lib/api";
import { Module, NewModule } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { modulesQueryKeys } from "../queryKeys";

export type CreateModuleParams = {
  module: NewModule;
};

export const createModule = async ({ module }: CreateModuleParams) =>
  await api.post("modules", { json: module }).json<Module>();

export const useCreateModule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createModule,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: modulesQueryKeys.modules });
    },
  });
};
