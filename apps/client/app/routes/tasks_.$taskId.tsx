import type { MetaFunction } from "@remix-run/node";
import { useParams } from "@remix-run/react";
import { EditTaskForm, useTask } from "~/features/tasks";
import invariant from "tiny-invariant";
import { Loader, Paper } from "@mantine/core";

export const meta: MetaFunction = () => {
  return [{ title: "Task" }];
};

export default function Task() {
  const { taskId } = useParams();
  invariant(taskId, "taskId is required");

  const task = useTask({ id: taskId });

  if (task.isLoading) {
    return <Loader />;
  }
  if (task.isSuccess) {
    return (
      <Paper bg="dark.8" p="xl">
        <EditTaskForm task={task.data} />
      </Paper>
    );
  }

  return null;
}
