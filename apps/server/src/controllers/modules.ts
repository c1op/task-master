import { and, eq } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import { db } from "~/db";
import { moduleTasks, modules, tasks, userModules, userTasks, users } from "~/db/schema";
import { NotFoundError, TaskDto, TaskModuleDto } from "~/types";
import { createModuleRequestSchema, updateModuleRequestSchema } from "~/types/request/modules";
import {
  CreateModuleResponse,
  GetModuleResponse,
  UpdateModuleResponse,
} from "~/types/response/modules";

export const getModules = async (request: Request, response: Response, _next: NextFunction) => {
  const token = request.token!;

  const dbModules = await db
    .select()
    .from(modules)
    .innerJoin(userModules, eq(userModules.module_id, modules.id))
    .where(eq(userModules.user_id, token.userId));

  return response.json(dbModules.map((x) => x.modules));
};

export const createModule = async (request: Request, response: Response, next: NextFunction) => {
  const createModule = createModuleRequestSchema.parse(request.body);

  const newModuleResult = await db
    .insert(modules)
    .values({ title: createModule.title })
    .returning();
  const newModule = newModuleResult[0];

  await db.insert(userModules).values({ user_id: request.token!.userId, module_id: newModule.id });

  response.json({
    id: newModule.id,
    title: newModule.title,
    createdAt: newModule.created_at.getTime(),
    updatedAt: newModule.updated_at.getTime(),
  } satisfies CreateModuleResponse);
};

export const getModule = async (request: Request, response: Response, next: NextFunction) => {
  const moduleId = request.params.moduleId;

  const dbModule = await db.select().from(modules).where(eq(modules.id, moduleId));

  if (dbModule.length === 0) {
    throw new NotFoundError("Module not found");
  }

  const module = dbModule[0];
  response.json({
    id: module.id,
    title: module.title,
    createdAt: module.created_at.getTime(),
    updatedAt: module.updated_at.getTime(),
  } satisfies GetModuleResponse);
};

export const updateModule = async (request: Request, response: Response, next: NextFunction) => {
  const updateModule = updateModuleRequestSchema.parse(request.body);

  const moduleId = request.params.moduleId;

  const result = await db
    .update(modules)
    .set({
      title: updateModule.title,
      updated_at: new Date(),
    })
    .where(eq(modules.id, moduleId))
    .returning();

  if (result.length === 0) {
    throw new NotFoundError("Module not found");
  }

  const updatedModule = result[0];
  response.json({
    id: updatedModule.id,
    title: updatedModule.title,
    createdAt: updatedModule.created_at.getTime(),
    updatedAt: updatedModule.updated_at.getTime(),
  } satisfies UpdateModuleResponse);
};

export const deleteModule = async (request: Request, response: Response, next: NextFunction) => {
  const moduleId = request.params.moduleId;

  await db.delete(modules).where(eq(modules.id, moduleId));
  await db.delete(moduleTasks).where(eq(moduleTasks.module_id, moduleId));
  await db.delete(userModules).where(eq(userModules.module_id, moduleId));

  response.json({});
};

export const getModuleTasks = async (request: Request, response: Response, _next: NextFunction) => {
  const token = request.token!;
  const moduleId = request.params.moduleId;

  const dbTasks = await db
    .select()
    .from(tasks)
    .innerJoin(moduleTasks, eq(moduleTasks.task_id, tasks.id))
    .innerJoin(modules, eq(modules.id, moduleTasks.module_id));

  const dbModules = await db
    .select()
    .from(modules)
    .innerJoin(userModules, eq(userModules.user_id, token.userId));

  const modulesMap = dbModules.reduce<Record<string, TaskModuleDto>>((acc, row) => {
    acc[row.modules.id] = { id: row.modules.id, title: row.modules.title };
    return acc;
  }, {});

  const tasksMap = dbTasks.reduce<Record<string, TaskDto>>((acc, row) => {
    const task = row.tasks;
    const module = row.modules;

    if (row.module_tasks.module_id !== moduleId) {
      return acc;
    }

    if (!acc[task.id]) {
      acc[task.id] = {
        id: task.id,
        title: task.title,
        status: task.status,
        labels: [],
        modules: [],
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

  return response.json(Object.values(tasksMap));
};
