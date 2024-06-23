import { Center } from "@mantine/core";
import type { MetaFunction } from "@remix-run/node";
import { LoginForm } from "../features/auth";

export const meta: MetaFunction = () => {
  return [{ title: "Login" }];
};

export default function Login() {
  return (
    <Center>
      <LoginForm />
    </Center>
  );
}
