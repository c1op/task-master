import { Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import {
  TokenPayload,
  deleteToken,
  saveToken,
  useAuthStore,
  useAuthStoreHydration,
} from "~/features/auth";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

export type AuthGuardProps = {
  children?: React.ReactNode;
};

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const token = useAuthStore((state) => state.token);
  const updateToken = useAuthStore((state) => state.updateToken);
  const hasHydrated = useAuthStoreHydration();

  const [hasHydratedToken, setHasHydratedToken] = useState(false);

  useEffect(() => {
    if (!hasHydrated || hasHydratedToken) {
      return;
    }

    if (token) {
      const tokenPayload = jwtDecode<TokenPayload>(token);
      const isExpired = dayjs.unix(tokenPayload.exp).isBefore(dayjs().utc());
      if (isExpired) {
        updateToken(null);
        deleteToken();
      } else {
        updateToken(token);
        saveToken(token);
      }
    }

    setHasHydratedToken(true);
  }, [hasHydrated, hasHydratedToken, token, updateToken]);

  if (!hasHydratedToken) {
    return <Loader />;
  }

  return <>{children}</>;
};
