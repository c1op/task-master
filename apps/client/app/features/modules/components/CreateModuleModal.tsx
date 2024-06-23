import { Modal } from "@mantine/core";
import { CreateModuleForm } from "./CreateModuleForm";
import { useCreateModule } from "../api";
import { CreateModuleFormData } from "../types";

export type CreateModuleModalProps = {
  opened: boolean;
  close: () => void;
};

export const CreateModuleModal = ({ opened, close }: CreateModuleModalProps) => {
  const createModuleMutation = useCreateModule();

  const handleSubmit = (data: CreateModuleFormData) => {
    createModuleMutation.mutate(
      { module: { title: data.title } },
      {
        onSuccess: () => {
          close();
        },
      },
    );
  };

  return (
    <Modal opened={opened} onClose={close} title="Create module">
      <CreateModuleForm onSubmit={handleSubmit} />
    </Modal>
  );
};
