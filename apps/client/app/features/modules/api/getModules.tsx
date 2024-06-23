import { api } from "~/lib/api";
import { Module } from "../types";
import { useQuery } from "@tanstack/react-query";
import { modulesQueryKeys } from "../queryKeys";

export const getModules = async () => await api.get("modules").json<Module[]>();

export const useModules = () => {
  return useQuery({ queryKey: modulesQueryKeys.modules, queryFn: getModules });
};
