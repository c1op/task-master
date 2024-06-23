import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store";
import { deleteToken } from "../utils";

export const signOut = async () => {
  deleteToken();
};

export const useSignOut = () => {
  const updateToken = useAuthStore((state) => state.updateToken);

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      updateToken(null);
    },
  });
};
