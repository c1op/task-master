import type { MetaFunction } from "@remix-run/node";
import { useParams } from "@remix-run/react";
import { EditTaskForm, TasksView, useTask } from "~/features/tasks";
import invariant from "tiny-invariant";
import { Loader, Paper } from "@mantine/core";
import { useModuleTasks, useModules } from "~/features/modules";
import { useLabels } from "~/features/labels";

export const meta: MetaFunction = () => {
  return [{ title: "Module" }];
};

export default function Module() {
  const { moduleId } = useParams();
  invariant(moduleId, "moduleId is required");

  const modules = useModules();
  const moduleTasks = useModuleTasks(moduleId);
  const labels = useLabels();

  if (moduleTasks.isLoading || modules.isLoading || labels.isLoading) {
    return <Loader />;
  }
  if (moduleTasks.isSuccess && modules.isSuccess && labels.isSuccess) {
    return (
      <Paper bg="dark.8" p="xl">
        <TasksView modules={modules.data} tasks={moduleTasks.data} labels={labels.data} />
      </Paper>
    );
  }

  return null;
}
