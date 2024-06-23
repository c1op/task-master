import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { AppShell } from "./components";
import "./styles.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthGuard } from "./providers";
import "@mantine/dates/styles.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <MantineProvider theme={theme} forceColorScheme="dark">
        <AuthGuard>
          <AppShell>
            <Outlet />
          </AppShell>
        </AuthGuard>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export function HydrateFallback() {
  return <p>Loading...</p>;
}
