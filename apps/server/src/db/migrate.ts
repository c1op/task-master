import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { createConnectionUrl } from "~/utils";

const connectionUrl = createConnectionUrl();

const migrationClient = postgres(connectionUrl, { max: 1 });
await migrate(drizzle(migrationClient), { migrationsFolder: "./drizzle" });

await migrationClient.end();
process.exit(0);
