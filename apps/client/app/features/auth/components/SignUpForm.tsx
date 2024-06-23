import { useForm, zodResolver } from "@mantine/form";
import { LoginFormData, RegisterFormData, loginFormSchema, registerFormSchema } from "../types";
import { Button, Flex, Paper, PasswordInput, TextInput } from "@mantine/core";
import { useLogin, useRegister } from "../api";
import { useNavigate } from "@remix-run/react";

export const SignUpForm = () => {
  const navigate = useNavigate();

  const registerMutation = useRegister();

  const form = useForm<RegisterFormData>({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },
    validate: zodResolver(registerFormSchema),
  });

  const handleSubmit = (data: LoginFormData) => {
    registerMutation.mutate(
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
          <Button type="submit" loading={registerMutation.isPending}>
            Sign Up
          </Button>
        </Flex>
      </form>
    </Paper>
  );
};
