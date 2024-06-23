CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"username" text NOT NULL,
	"hashed_password" text NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
