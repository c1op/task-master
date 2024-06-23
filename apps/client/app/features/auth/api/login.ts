import { useMutation } from "@tanstack/react-query";
import { api } from "~/lib/api";
import { useAuthStore } from "../store";
import { LoginResponse } from "../types";
import { saveToken } from "../utils";

export type LoginParams = {
  username: string;
  password: string;
};

export const login = async ({ username, password }: LoginParams) =>
  await api.post("auth/login", { json: { username, password } }).json<LoginResponse>();

export const useLogin = () => {
  const updateToken = useAuthStore((state) => state.updateToken);

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      updateToken(data.token);
      saveToken(data.token);
    },
  });
};
