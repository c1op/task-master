import { ActionIcon, NavLink, Text } from "@mantine/core";
import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";
import { PiCaretRightBold, PiTrash } from "react-icons/pi";
import { ComboboxButton, Table } from "~/components";
import {
  useDeleteTask,
  useDeleteTaskLabels,
  useDeleteTaskModules,
  useUpdateTaskLabels,
  useUpdateTaskModules,
} from "../api";
import dayjs from "dayjs";
import { TaskStatusSelect } from "./TaskStatusSelect";
import { Module } from "~/features/modules";
import { Label } from "~/features/labels";
import { Task } from "../types";

const tasksTableColumnHelper = createColumnHelper<Task>();

export type TasksView = {
  tasks: Task[];
  modules: Module[];
  labels: Label[];
};

export const TasksView = ({ tasks, modules, labels }: TasksView) => {
  const columns = useMemo(
    () => [
      tasksTableColumnHelper.accessor("title", {
        header: "Title",
        cell: (ctx) => (
          <NavLink
            label={ctx.getValue()}
            href={`/tasks/${ctx.row.original.id}`}
            rightSection={<PiCaretRightBold />}
          />
        ),
      }),
      tasksTableColumnHelper.accessor("status", {
        header: "Status",
        cell: (ctx) => <TaskStatusSelect taskId={ctx.row.original.id} value={ctx.getValue()} />,
      }),
      tasksTableColumnHelper.display({
        header: "Labels",
        cell: (ctx) => <LabelSelectColumn labels={labels} task={ctx.row.original} />,
      }),
      tasksTableColumnHelper.display({
        header: "Modules",
        cell: (ctx) => <ModuleSelectColumn modules={modules} task={ctx.row.original} />,
      }),
      tasksTableColumnHelper.accessor("createdAt", {
        header: "Created On",
        cell: (ctx) => dayjs.utc(ctx.getValue()).format("MMM D, YYYY"),
      }),
      tasksTableColumnHelper.accessor("updatedAt", {
        header: "Updated On",
        cell: (ctx) => dayjs.utc(ctx.getValue()).format("MMM D, YYYY"),
      }),
      tasksTableColumnHelper.display({
        id: "delete",
        cell: ({ row }) => <DeleteTaskButton taskId={row.original.id} />,
      }),
    ],
    [tasksTableColumnHelper],
  );

  const table = useReactTable({ columns, data: tasks, getCoreRowModel: getCoreRowModel<Task>() });

  return <Table table={table} />;
};

type ModuleSelectColumnProps = {
  modules: Module[];
  task: Task;
};

const ModuleSelectColumn = ({ modules, task }: ModuleSelectColumnProps) => {
  const updateTaskModules = useUpdateTaskModules();
  const deleteTaskModules = useDeleteTaskModules();

  const handleModuleSelect = (moduleId: string) => {
    updateTaskModules.mutate({ id: task.id, data: { modules: [moduleId] } });
  };

  const handleModuleDeselect = (moduleId: string) => {
    deleteTaskModules.mutate({ id: task.id, data: { modules: [moduleId] } });
  };

  return (
    <ComboboxButton
      items={modules.map((module) => module.id)}
      defaultSelected={task.modules.map((x) => x.id)}
      onItemSelect={handleModuleSelect}
      onItemDeselect={handleModuleDeselect}
      onItemRender={(moduleId) => modules.find((module) => module.id === moduleId)?.title ?? ""}
    >
      {(selectedItems) => <Text>{selectedItems.length}</Text>}
    </ComboboxButton>
  );
};

type LabelSelectColumnProps = {
  labels: Label[];
  task: Task;
};

const LabelSelectColumn = ({ labels, task }: LabelSelectColumnProps) => {
  const updateTaskLabels = useUpdateTaskLabels();
  const deleteTaskLabels = useDeleteTaskLabels();

  const handleLabelSelect = (labelId: string) => {
    updateTaskLabels.mutate({ id: task.id, data: { labels: [labelId] } });
  };

  const handleLabelDeselect = (labelId: string) => {
    deleteTaskLabels.mutate({ id: task.id, data: { labels: [labelId] } });
  };

  return (
    <ComboboxButton
      items={labels.map((label) => label.id)}
      defaultSelected={task.labels}
      onItemSelect={handleLabelSelect}
      onItemDeselect={handleLabelDeselect}
      onItemRender={(labelId) => labels.find((label) => label.id === labelId)?.name ?? ""}
    >
      {(selectedItems) => <Text>{selectedItems.length}</Text>}
    </ComboboxButton>
  );
};

type DeleteTaskButtonProps = {
  taskId: string;
};

export const DeleteTaskButton = ({ taskId }: DeleteTaskButtonProps) => {
  const deleteTaskMutation = useDeleteTask();

  const handleDeleteTask = () => {
    deleteTaskMutation.mutate(taskId);
  };

  return (
    <ActionIcon
      variant="outline"
      color="red"
      onClick={handleDeleteTask}
      loading={deleteTaskMutation.isPending}
    >
      <PiTrash />
    </ActionIcon>
  );
};
