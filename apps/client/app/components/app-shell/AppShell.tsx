import {
  AppShell as MantineAppShell,
  Skeleton,
  Flex,
  Title,
  Button,
  Menu,
  NavLink,
  Loader,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "@remix-run/react";
import React, { useEffect } from "react";
import { useAuthStore, useGetSession, useIsLoggedIn, useSignOut } from "~/features/auth";

type AppShellProps = {
  children?: React.ReactNode;
};

export const AppShell = ({ children }: AppShellProps) => {
  const isLoggedIn = useIsLoggedIn();
  const [isNavbarOpen, { open: openNavbar, close: closeNavbar }] = useDisclosure(false);

  useEffect(() => {
    if (isLoggedIn) {
      openNavbar();
    } else {
      closeNavbar();
    }
  }, [isLoggedIn]);

  return (
    <MantineAppShell
      header={{ height: 80 }}
      navbar={{
        width: 200,
        breakpoint: "sm",
        collapsed: { mobile: !isNavbarOpen, desktop: !isNavbarOpen },
      }}
      padding="md"
    >
      <Header />
      <MantineAppShell.Navbar p="md">
        <NavLink label="Tasks" href="/tasks" />
        <NavLink label="Modules" href="/modules" />
        <NavLink label="Labels" href="/labels" />
      </MantineAppShell.Navbar>
      <MantineAppShell.Main>{children}</MantineAppShell.Main>
    </MantineAppShell>
  );
};

const Header = () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <MantineAppShell.Header>
      <Flex h="100%" direction="row" gap="md" align="center" px="lg">
        <Title order={1}>Task Master</Title>
        <Flex ml="auto">
          {!isLoggedIn && (
            <Button component="a" variant="light" size="md" href="/login">
              Sign in
            </Button>
          )}
          {isLoggedIn && <UserMenu />}
        </Flex>
      </Flex>
    </MantineAppShell.Header>
  );
};

const UserMenu = () => {
  const session = useGetSession();

  return (
    <Menu withArrow trigger="hover" openDelay={100} closeDelay={200}>
      <Menu.Target>
        <Button size="md" variant="subtle">
          {session.isFetching && <Loader />}
          {session.isSuccess && <span>{session.data.username}</span>}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <SignOutMenuItem />
      </Menu.Dropdown>
    </Menu>
  );
};

const SignOutMenuItem = () => {
  const signOut = useSignOut();

  const navigate = useNavigate();

  return (
    <Menu.Item
      onClick={() => {
        signOut.mutate(undefined, {
          onSuccess: () => {
            navigate("/login");
          },
        });
      }}
    >
      Sign out
    </Menu.Item>
  );
};
