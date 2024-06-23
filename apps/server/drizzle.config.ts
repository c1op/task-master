import { defineConfig } from "drizzle-kit";

if (!process.env.DB_HOST) {
  throw new Error("DB_HOST is required");
}
if (!process.env.DB_PORT) {
  throw new Error("DB_PORT is required");
}
if (!process.env.DB_NAME) {
  throw new Error("DB_USER is required");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
  },
  verbose: true,
  strict: true,
});
