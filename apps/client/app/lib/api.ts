import ky from "ky";
import { createAuthroizationHeader, getToken } from "~/features/auth";
import { env } from "~/utils";

export const api = ky.create({
  prefixUrl: env.VITE_API_URL,
  hooks: {
    beforeRequest: [
      (options) => {
        const token = getToken();

        if (token) {
          options.headers.set("Authorization", createAuthroizationHeader(token));
        }
      },
    ],
  },
});
