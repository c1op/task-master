import React from "react";
import { Button, TextInput, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { CreateModuleFormData, createModuleFormSchema } from "../types";

interface CreateModuleFormProps {
  onSubmit: (values: CreateModuleFormData) => void;
}

export function CreateModuleForm({ onSubmit }: CreateModuleFormProps) {
  const form = useForm<CreateModuleFormData>({
    mode: "uncontrolled",
    initialValues: {
      title: "",
    },
    validate: zodResolver(createModuleFormSchema),
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <TextInput
        withAsterisk
        label="Title"
        key={form.key("title")}
        {...form.getInputProps("title")}
      />

      <Button type="submit">Create</Button>
    </form>
  );
}
