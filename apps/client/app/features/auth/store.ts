import { UserSession } from "./types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  token: string | null;

  updateToken: (token: string | null) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,

      updateToken: (token) => set({ token }),
    }),
    {
      name: "auth-store",
      partialize: (state) => {
        return { token: state.token };
      },
    },
  ),
);
