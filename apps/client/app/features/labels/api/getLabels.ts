import { api } from "~/lib/api";
import { Label } from "../types";
import { useQuery } from "@tanstack/react-query";
import { labelsQueryKeys } from "../queryKeys";

export const getLabels = async () => await api.get("labels").json<Label[]>();

export const useLabels = () => {
  return useQuery({ queryKey: labelsQueryKeys.labels, queryFn: getLabels });
};
