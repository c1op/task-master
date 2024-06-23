import {
  ActionIcon,
  Button,
  Divider,
  Flex,
  List,
  Loader,
  Paper,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { PiCheck, PiX } from "react-icons/pi";
import {
  CreateLabelFormData,
  Label,
  createLabelFormSchema,
  useCreateLabel,
  useDeleteLabel,
  useLabels,
} from "~/features/labels";

export const meta: MetaFunction = () => {
  return [{ title: "Labels" }];
};

export default function Labels() {
  const [isCreatingLabel, setIsCreatingLabel] = useState(false);

  const labels = useLabels();

  const handleClickCreateLabel = () => {
    setIsCreatingLabel(true);
  };

  const handleCreateLabelCancel = () => {
    setIsCreatingLabel(false);
  };

  const handleCreateLabelSuccess = () => {
    setIsCreatingLabel(false);
  };

  return (
    <Flex direction="column" gap="lg">
      <Flex direction="row">
        <Title order={1}>Labels</Title>
        <Button ml="auto" variant="filled" onClick={handleClickCreateLabel}>
          Create label
        </Button>
      </Flex>
      <Divider />
      <Paper p="sm" bg="dark.8">
        {labels.isLoading && <Loader />}
        {labels.isSuccess && (
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--mantine-spacing-xs)",
              listStyleType: "none",
            }}
          >
            {isCreatingLabel && (
              <CreateLabelListItem
                onCancel={handleCreateLabelCancel}
                onSuccess={handleCreateLabelSuccess}
              />
            )}
            {labels.data.map((label) => (
              <LabelListItem label={label} />
            ))}
          </ul>
        )}
      </Paper>
    </Flex>
  );
}

type LabelsListItemWrapperProps = {
  children: React.ReactNode;
};

const LabelsListItemWrapper = ({ children }: LabelsListItemWrapperProps) => {
  return (
    <li
      style={{
        height: "50px",
        padding: "var(--mantine-spacing-xs)",
        border: "1px solid var(--mantine-color-dark-4)",
        borderRadius: "var(--mantine-radius-md)",
      }}
    >
      {children}
    </li>
  );
};

type CreateLabelListItemProps = {
  onCancel: () => void;
  onSuccess: () => void;
};

const CreateLabelListItem = ({ onCancel, onSuccess }: CreateLabelListItemProps) => {
  const createLabelMutation = useCreateLabel();

  const form = useForm<CreateLabelFormData>({
    mode: "uncontrolled",
    initialValues: { name: "" },
    validate: zodResolver(createLabelFormSchema),
  });

  const handleSubmit = (data: CreateLabelFormData) => {
    createLabelMutation.mutate(
      { name: data.name },
      {
        onSuccess: () => {
          onSuccess();
        },
      },
    );
  };

  return (
    <LabelsListItemWrapper>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex direction="row" gap="md">
          <TextInput
            size="xs"
            placeholder="Label name"
            key={form.key("name")}
            {...form.getInputProps("name")}
          />
          <Flex direction="row" gap="xs">
            <ActionIcon type="submit" variant="filled" loading={createLabelMutation.isPending}>
              <PiCheck />
            </ActionIcon>
            <ActionIcon
              variant="default"
              onClick={() => {
                onCancel();
              }}
              loading={createLabelMutation.isPending}
            >
              <PiX />
            </ActionIcon>
          </Flex>
        </Flex>
      </form>
    </LabelsListItemWrapper>
  );
};

type LabelListItemProps = {
  label: Label;
};

const LabelListItem = ({ label }: LabelListItemProps) => {
  const deleteLabelMutation = useDeleteLabel();

  return (
    <LabelsListItemWrapper>
      <Flex w="100%" direction="row">
        <Text>{label.name}</Text>
        <ActionIcon
          color="red"
          variant="light"
          ml="auto"
          onClick={() => {
            deleteLabelMutation.mutate(label.id);
          }}
        >
          <PiX />
        </ActionIcon>
      </Flex>
    </LabelsListItemWrapper>
  );
};
