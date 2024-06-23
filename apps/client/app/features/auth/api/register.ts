import { api } from "~/lib/api";
import { RegisterResponse } from "../types";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store";
import { saveToken } from "../utils";
import { useNavigate } from "@remix-run/react";

export type RegisterParams = {
  username: string;
  password: string;
};

export type UseRegisterParams = RegisterParams;

export const register = async ({ username, password }: RegisterParams) =>
  await api.post("auth/register", { json: { username, password } }).json<RegisterResponse>();

export const useRegister = () => {
  const updateToken = useAuthStore((state) => state.updateToken);

  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      updateToken(data.token);
      saveToken(data.token);
    },
  });
};
