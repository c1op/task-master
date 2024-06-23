import React from "react";
import { Button, TextInput, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { CreateTaskFormData, createTaskFormSchema } from "../types";

interface CreateTaskFormProps {
  onSubmit: (values: CreateTaskFormData) => void;
}

export function CreateTaskForm({ onSubmit }: CreateTaskFormProps) {
  const form = useForm<CreateTaskFormData>({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      content: "",
    },
    validate: zodResolver(createTaskFormSchema),
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <TextInput
        withAsterisk
        label="Title"
        key={form.key("title")}
        {...form.getInputProps("title")}
      />

      <Textarea label="Description" key={form.key("content")} {...form.getInputProps("content")} />

      <Button type="submit">Submit</Button>
    </form>
  );
}
