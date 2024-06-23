import { useForm, zodResolver } from "@mantine/form";
import { LoginFormData, loginFormSchema } from "../types";
import { Anchor, Button, Flex, Paper, PasswordInput, TextInput, Text } from "@mantine/core";
import { useLogin } from "../api";
import { useNavigate } from "@remix-run/react";

export const LoginForm = () => {
  const navigate = useNavigate();

  const login = useLogin();

  const form = useForm<LoginFormData>({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },
    validate: zodResolver(loginFormSchema),
  });

  const handleSubmit = (data: LoginFormData) => {
    login.mutate(
      { username: data.username, password: data.password },
      {
        onSuccess: () => {
          navigate("/tasks");
        },
      },
    );
  };

  return (
    <Paper bg="dark.8" py="xl" px="6rem" w="500px">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex direction="column" gap="xl">
          <Flex direction="column" gap="md">
            <TextInput
              label="Username"
              key={form.key("username")}
              {...form.getInputProps("username")}
            />
            <PasswordInput
              label="Password"
              key={form.key("password")}
              {...form.getInputProps("password")}
            />
          </Flex>

          <Flex direction="column" gap="xs">
            <Button type="submit">Login</Button>
            <Flex direction="row" gap="0.5rem" align="center">
              <Text size="sm">Dont have an account ?</Text>
              <Anchor size="sm" href="/sign-up">
                Sign Up
              </Anchor>
            </Flex>
          </Flex>
        </Flex>
      </form>
    </Paper>
  );
};
