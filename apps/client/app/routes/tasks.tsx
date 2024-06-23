import { Button, Flex, Paper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { MetaFunction } from "@remix-run/node";
import { useLabels } from "~/features/labels";
import { useModules } from "~/features/modules";
import { useTasks, TasksView } from "~/features/tasks";
import { CreateTaskModal } from "~/features/tasks/components";

export const meta: MetaFunction = () => {
  return [{ title: "Tasks" }];
};

export default function Tasks() {
  const tasks = useTasks();
  const modules = useModules();
  const labels = useLabels();

  const [isCreateTaskModalOpen, { close: closeCreateTaskModal, open: openCreateTaskModal }] =
    useDisclosure(false);

  return (
    <Flex direction="column" gap="lg">
      <Button
        mr="auto"
        variant="filled"
        onClick={() => {
          openCreateTaskModal();
        }}
      >
        Create task
      </Button>
      <Paper p="sm" bg="dark.8">
        {tasks.isSuccess && modules.isSuccess && labels.isSuccess && (
          <TasksView tasks={tasks.data} modules={modules.data} labels={labels.data} />
        )}
      </Paper>
      <CreateTaskModal opened={isCreateTaskModalOpen} close={closeCreateTaskModal} />
    </Flex>
  );
}
