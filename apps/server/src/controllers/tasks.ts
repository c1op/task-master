import { and, eq, inArray, sql } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import { db } from "~/db";
import { labels, moduleTasks, modules, taskLabels, tasks, userTasks, users } from "~/db/schema";
import { NotFoundError, TaskDto } from "~/types";
import {
  createTaskRequestSchema,
  deleteTaskLabelsRequestSchema,
  deleteTaskModulesRequestSchema,
  updateTaskLabelsRequestSchema,
  updateTaskModulesRequestSchema,
  updateTaskRequestSchema,
} from "~/types/request";
import { CreateTaskResponse, GetTaskResponse, UpdateTaskResponse } from "~/types/response";

export const getTasks = async (request: Request, response: Response, _next: NextFunction) => {
  const token = request.token!;

  const dbTasks = await db
    .select()
    .from(tasks)
    .innerJoin(userTasks, eq(userTasks.task_id, tasks.id))
    .innerJoin(users, eq(users.id, userTasks.user_id))
    .leftJoin(moduleTasks, eq(moduleTasks.task_id, tasks.id))
    .leftJoin(modules, eq(modules.id, moduleTasks.module_id))
    .where(eq(users.id, token.userId));

  const tasksMap = dbTasks.reduce<Record<string, TaskDto>>((acc, row) => {
    const task = row.tasks;
    const module = row.modules;

    if (!acc[task.id]) {
      acc[task.id] = {
        id: task.id,
        title: task.title,
        status: task.status,
        modules: [],
        labels: [],
        createdAt: task.created_at.getTime(),
        updatedAt: task.updated_at.getTime(),
        dueAt: task.due_at?.getTime() ?? null,
        content: task.content,
      };
    }

    if (module) {
      acc[task.id].modules.push({
        id: module.id,
        title: module.title,
      });
    }

    return acc;
  }, {});

  const taskIds = Object.keys(tasksMap);
  const taskLabels = await db.query.taskLabels.findMany({
    where: (taskLabels, { inArray }) => inArray(taskLabels.task_id, taskIds),
  });

  taskLabels.forEach((taskLabel) => {
    tasksMap[taskLabel.task_id].labels.push(taskLabel.label_id);
  });

  return response.json(Object.values(tasksMap));
};

export const createTask = async (request: Request, response: Response, next: NextFunction) => {
  const createTask = createTaskRequestSchema.parse(request.body);

  const newTaskResult = await db
    .insert(tasks)
    .values({ title: createTask.title, content: createTask.content })
    .returning();
  const newTask = newTaskResult[0];

  await db.insert(userTasks).values({ user_id: request.token!.userId, task_id: newTask.id });

  response.json({
    id: newTask.id,
    title: newTask.title,
    status: newTask.status,
    labels: [],
    modules: [],
    createdAt: newTask.created_at.getTime(),
    updatedAt: newTask.updated_at.getTime(),
    dueAt: newTask.due_at?.getTime() ?? null,
    content: newTask.content,
  } satisfies CreateTaskResponse);
};

export const getTask = async (request: Request, response: Response, next: NextFunction) => {
  const taskId = request.params.taskId;

  const dbTask = await db.select().from(tasks).where(eq(tasks.id, taskId));

  if (dbTask.length === 0) {
    throw new NotFoundError("Task not found");
  }

  const task = dbTask[0];
  response.json({
    id: task.id,
    title: task.title,
    status: task.status,
    labels: [],
    modules: [],
    createdAt: task.created_at.getTime(),
    updatedAt: task.updated_at.getTime(),
    dueAt: task.due_at?.getTime() ?? null,
    content: task.content,
  } satisfies GetTaskResponse);
};

export const updateTask = async (request: Request, response: Response, next: NextFunction) => {
  const updateTask = updateTaskRequestSchema.parse(request.body);

  const taskId = request.params.taskId;

  const result = await db
    .update(tasks)
    .set({
      title: updateTask.title,
      status: updateTask.status,
      due_at: updateTask.dueAt ? new Date(updateTask.dueAt) : null,
      content: updateTask.content,
      updated_at: new Date(),
    })
    .where(eq(tasks.id, taskId))
    .returning();

  if (result.length === 0) {
    throw new NotFoundError("Task not found");
  }

  const updatedTask = result[0];
  response.json({
    id: updatedTask.id,
    title: updatedTask.title,
    status: updatedTask.status,
    labels: [],
    modules: [],
    createdAt: updatedTask.created_at.getTime(),
    updatedAt: updatedTask.updated_at.getTime(),
    dueAt: updatedTask.due_at?.getTime() ?? null,
    content: updatedTask.content,
  } satisfies UpdateTaskResponse);
};

export const deleteTask = async (request: Request, response: Response, next: NextFunction) => {
  const taskId = request.params.taskId;

  await db.delete(tasks).where(eq(tasks.id, taskId));
  await db.delete(userTasks).where(eq(userTasks.task_id, taskId));
  await db.delete(moduleTasks).where(eq(moduleTasks.task_id, taskId));

  response.json({});
};

export const updateTaskModules = async (
  request: Request,
  response: Response,
  _next: NextFunction,
) => {
  const taskId = request.params.taskId;
  const { modules: moduleIds } = updateTaskModulesRequestSchema.parse(request.body);

  await db
    .insert(moduleTasks)
    .values(moduleIds.map((moduleId: string) => ({ task_id: taskId, module_id: moduleId })))
    .onConflictDoUpdate({
      target: [moduleTasks.task_id, moduleTasks.module_id],
      set: { module_id: sql`excluded.module_id` },
    });

  response.json({});
};

export const deleteTaskModules = async (
  request: Request,
  response: Response,
  _next: NextFunction,
) => {
  const taskId = request.params.taskId;
  const { modules: moduleIds } = deleteTaskModulesRequestSchema.parse(request.body);

  await db
    .delete(moduleTasks)
    .where(and(eq(moduleTasks.task_id, taskId), inArray(moduleTasks.module_id, moduleIds)));

  response.json({});
};

export const updateTaskLabels = async (
  request: Request,
  response: Response,
  _next: NextFunction,
) => {
  const taskId = request.params.taskId;
  const updateTaskLabels = updateTaskLabelsRequestSchema.parse(request.body);

  await db
    .insert(taskLabels)
    .values(updateTaskLabels.labels.map((labelId) => ({ task_id: taskId, label_id: labelId })))
    .onConflictDoUpdate({
      target: [taskLabels.task_id, taskLabels.label_id],
      set: { label_id: sql`excluded.label_id` },
    });

  response.json({});
};

export const deleteTaskLabels = async (
  request: Request,
  response: Response,
  _next: NextFunction,
) => {
  const taskId = request.params.taskId;
  const deleteTaskLabels = deleteTaskLabelsRequestSchema.parse(request.body);

  await db
    .delete(taskLabels)
    .where(
      and(eq(taskLabels.task_id, taskId), inArray(taskLabels.label_id, deleteTaskLabels.labels)),
    );

  response.json({});
};
