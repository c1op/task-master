import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 100_000,
      gcTime: 1000 * 60 * 60 * 24 /* 24 hours*/,
    },
  },
});
