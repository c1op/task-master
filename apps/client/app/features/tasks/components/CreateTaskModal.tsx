import { Modal } from "@mantine/core";
import { Form } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { CreateTaskForm } from "./CreateTaskForm";
import { CreateTaskFormData } from "../types";
import { useCreateTask } from "../api";

export type CreateTaskModalProps = {
  opened: boolean;
  close: () => void;
};

export const CreateTaskModal = ({ opened, close }: CreateTaskModalProps) => {
  const createTaskMutation = useCreateTask();

  const handleSubmit = (data: CreateTaskFormData) => {
    createTaskMutation.mutate(
      { title: data.title, content: data.content },
      {
        onSuccess: () => {
          close();
        },
      },
    );
  };

  return (
    <Modal opened={opened} onClose={close} title="Create task">
      <CreateTaskForm onSubmit={handleSubmit} />
    </Modal>
  );
};
