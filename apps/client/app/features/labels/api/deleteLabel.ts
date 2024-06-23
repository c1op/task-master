import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/lib/api";
import { labelsQueryKeys } from "../queryKeys";

export const deleteLabel = async (labelId: string) => await api.delete(`labels/${labelId}`);

export const useDeleteLabel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLabel,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: labelsQueryKeys.labels });
    },
  });
};
