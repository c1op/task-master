import { relations, sql } from "drizzle-orm";
import { pgEnum, pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { uuidDefault } from "~/utils";

//#region ---------- USERS ----------
export const users = pgTable("users", {
  id: uuid("id").primaryKey().default(uuidDefault),
  username: text("username").unique().notNull(),
  hashed_password: text("hashed_password").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  userTasks: many(userTasks),
  userModules: many(userModules),
}));

export const userTasks = pgTable(
  "user_tasks",
  {
    user_id: uuid("user_id")
      .references(() => users.id)
      .notNull(),
    task_id: uuid("task_id")
      .references(() => tasks.id)
      .notNull(),
  },
  (table) => {
    return { pk: primaryKey({ columns: [table.user_id, table.task_id] }) };
  },
);

export const userTasksRelations = relations(userTasks, ({ one }) => ({
  user: one(users, { fields: [userTasks.user_id], references: [users.id] }),
  task: one(tasks, { fields: [userTasks.task_id], references: [tasks.id] }),
}));

export const userModules = pgTable(
  "user_modules",
  {
    user_id: uuid("user_id")
      .references(() => users.id)
      .notNull(),
    module_id: uuid("module_id")
      .references(() => modules.id)
      .notNull(),
  },
  (table) => {
    return { pk: primaryKey({ columns: [table.user_id, table.module_id] }) };
  },
);

export const userModulesRelations = relations(userModules, ({ one }) => ({
  user: one(users, { fields: [userModules.user_id], references: [users.id] }),
  module: one(modules, { fields: [userModules.module_id], references: [modules.id] }),
}));

//#endregion

//#region ---------- TASKS ----------
export const taskStatusEnum = pgEnum("task_status", ["todo", "in_progress", "done"]);

export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().default(uuidDefault),
  title: text("title").notNull(),
  status: taskStatusEnum("status").default("todo").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
  due_at: timestamp("due_at"),
  content: text("content"),
});

//#endregion

//#region ---------- MODULES ----------
export const modules = pgTable("modules", {
  id: uuid("id").primaryKey().default(uuidDefault),
  title: text("title").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const moduleTasks = pgTable(
  "module_tasks",
  {
    module_id: uuid("module_id").notNull(),
    task_id: uuid("task_id").notNull(),
  },
  (table) => {
    return { pk: primaryKey({ columns: [table.module_id, table.task_id] }) };
  },
);
//#endregion

//#region ---------- LABELS ----------
export const labels = pgTable("labels", {
  id: uuid("id").primaryKey().default(uuidDefault),
  user_id: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  name: text("name").notNull(),
});

export const labelsRelations = relations(labels, ({ one, many }) => ({
  user: one(users, { fields: [labels.user_id], references: [users.id] }),
}));

export const taskLabels = pgTable(
  "task_labels",
  {
    task_id: uuid("task_id")
      .references(() => tasks.id, { onDelete: "cascade" })
      .notNull(),
    label_id: uuid("label_id")
      .references(() => labels.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => {
    return { pk: primaryKey({ columns: [table.task_id, table.label_id] }) };
  },
);

export const taskLabelsRelations = relations(taskLabels, ({ one }) => ({
  task: one(tasks, { fields: [taskLabels.task_id], references: [tasks.id] }),
  label: one(labels, { fields: [taskLabels.label_id], references: [labels.id] }),
}));

//#endregion
