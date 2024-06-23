import { api } from "~/lib/api";
import { CreateLabel, Label } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { labelsQueryKeys } from "../queryKeys";

export const createLabel = async (label: CreateLabel) =>
  await api.post("labels", { json: label }).json<Label>();

export const useCreateLabel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLabel,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: labelsQueryKeys.labels });
    },
  });
};
