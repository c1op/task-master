import { ActionIcon, Card, Flex, Grid, Title } from "@mantine/core";
import { Module } from "../types";
import { PiTrash } from "react-icons/pi";
import { useDeleteModule } from "../api";

export type ModulesViewProps = {
  modules: Module[];
};

export const ModulesView = ({ modules }: ModulesViewProps) => {
  return (
    <Grid>
      {modules.map((module) => (
        <Grid.Col span={4}>
          <ModuleCard module={module} />
        </Grid.Col>
      ))}
    </Grid>
  );
};

type ModuleCardProps = {
  module: Module;
};

const ModuleCard = ({ module }: ModuleCardProps) => {
  const deleteModuleMutation = useDeleteModule();

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    deleteModuleMutation.mutate(module.id);
  };

  return (
    <Card component="a" href={`/modules/${module.id}`}>
      <Flex direction="row">
        <Title order={3}>{module.title}</Title>
        <ActionIcon
          variant="outline"
          color="red"
          ml="auto"
          loading={deleteModuleMutation.isPending}
          onClick={handleDelete}
        >
          <PiTrash />
        </ActionIcon>
      </Flex>
    </Card>
  );
};
