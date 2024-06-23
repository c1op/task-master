DO $$ BEGIN
 CREATE TYPE "public"."task_status" AS ENUM('todo', 'in_progress', 'done');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "module_tasks" (
	"module_id" uuid NOT NULL,
	"task_id" uuid NOT NULL,
	CONSTRAINT "module_tasks_module_id_task_id_pk" PRIMARY KEY("module_id","task_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "modules" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"title" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tasks" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"title" text NOT NULL,
	"status" "task_status" DEFAULT 'todo' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"content" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_modules" (
	"user_id" uuid NOT NULL,
	"module_id" uuid NOT NULL,
	CONSTRAINT "user_modules_user_id_module_id_pk" PRIMARY KEY("user_id","module_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_tasks" (
	"user_id" uuid NOT NULL,
	"task_id" uuid NOT NULL,
	CONSTRAINT "user_tasks_user_id_task_id_pk" PRIMARY KEY("user_id","task_id")
);
