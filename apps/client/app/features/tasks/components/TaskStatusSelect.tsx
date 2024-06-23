import { Select } from "@mantine/core";
import { useUpdateTask } from "../api";
import { TaskStatus, taskStatusSchema } from "../types";

export type TaskStatusSelectProps = {
  taskId: string;

  value: TaskStatus;
};

export const TaskStatusSelect = ({ taskId, value }: TaskStatusSelectProps) => {
  const updateTask = useUpdateTask();

  const onChange = (value: string | null) => {
    if (value === null) {
      return;
    }
    updateTask.mutate({ id: taskId, data: { status: taskStatusSchema.parse(value) } });
  };

  return (
    <Select
      maw="150px"
      variant="filled"
      value={value}
      onChange={onChange}
      data={[
        { label: "TODO", value: "todo" },
        { label: "In Progress", value: "in_progress" },
        { label: "Done", value: "done" },
      ]}
    />
  );
};
