import { api } from "~/lib/api";
import { UserSession } from "../types";
import { useQuery } from "@tanstack/react-query";
import { authQueryKeys } from "../queryKeys";

export const getSession = async () => {
  return await api.get("auth/session").json<UserSession>();
};

export const useGetSession = () => {
  return useQuery({
    queryKey: authQueryKeys.session,
    queryFn: getSession,
  });
};
