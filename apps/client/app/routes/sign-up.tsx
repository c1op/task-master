import { Center } from "@mantine/core";
import type { MetaFunction } from "@remix-run/node";
import { SignUpForm } from "../features/auth";

export const meta: MetaFunction = () => {
  return [{ title: "Sign Up" }];
};

export default function SignUp() {
  return (
    <Center>
      <SignUpForm />
    </Center>
  );
}
