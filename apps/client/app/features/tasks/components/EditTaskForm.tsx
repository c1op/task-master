import { useForm, zodResolver } from "@mantine/form";
import { EditTaskFormData, Task, editTaskFormSchema } from "../types";
import { Divider, Flex, TextInput, Textarea } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { useUpdateTask } from "../api";
import { isStringEmpty } from "~/utils";
import { useState } from "react";
import { DatePickerInput, DateValue } from "@mantine/dates";

export type EditTaskForm = {
  task: Task;
};

export const EditTaskForm = ({ task }: EditTaskForm) => {
  return (
    <Flex direction="column" gap="md">
      <TitleInput task={task} />

      <Flex direction="row" gap="lg">
        <DatePickerInput
          readOnly
          w="150px"
          label="Created on"
          defaultValue={new Date(task.createdAt)}
        />
        <DatePickerInput
          readOnly
          w="150px"
          label="Updated on"
          defaultValue={new Date(task.updatedAt)}
        />
        <DueAt task={task} />
      </Flex>
      <Divider />
      <ContentTextarea task={task} />
    </Flex>
  );
};

type TitleInputProps = {
  task: Task;
};

const TitleInput = ({ task }: TitleInputProps) => {
  const updateTaskMutation = useUpdateTask();

  const [value, setValue] = useState(task.title);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value);
    updateTask(e.currentTarget.value);
  };

  const updateTask = useDebouncedCallback((value: string) => {
    updateTaskMutation.mutate({
      id: task.id,
      data: {
        title: value,
      },
    });
  }, 1000);

  return <TextInput w="500px" label="Title" defaultValue={value} onChange={handleChange} />;
};

type ContentTextareaProps = {
  task: Task;
};

const ContentTextarea = ({ task }: ContentTextareaProps) => {
  const updateTaskMutation = useUpdateTask();

  const [value, setValue] = useState(task.content ?? "");

  const handleChange = useDebouncedCallback(
    ((e) => {
      updateTaskMutation.mutate({
        id: task.id,
        data: {
          content: isStringEmpty(e.target.value) ? null : e.target.value,
        },
      });

      setValue(e.target.title);
    }) satisfies React.ChangeEventHandler<HTMLTextAreaElement>,
    1000,
  );

  return (
    <Textarea
      autosize
      label="Description"
      defaultValue={value}
      onChange={handleChange}
      minRows={6}
      maxRows={18}
      maw="500px"
    />
  );
};

type DueAtInputProps = {
  task: Task;
};

export const DueAt = ({ task }: DueAtInputProps) => {
  const updateTask = useUpdateTask();

  const defaultValue = task.dueAt ? new Date(task.dueAt) : undefined;

  const handleChange = (value: DateValue) => {
    updateTask.mutate({
      id: task.id,
      data: {
        dueAt: value ? value.getTime() : null,
      },
    });
  };

  return (
    <DatePickerInput
      clearable
      w="150px"
      label="Due at"
      defaultValue={defaultValue}
      onChange={handleChange}
    />
  );
};
