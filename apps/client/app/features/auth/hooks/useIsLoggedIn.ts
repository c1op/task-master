import { useAuthStore } from "../store";

export const useIsLoggedIn = () => {
  const token = useAuthStore((state) => state.token);

  return !!token;
};
