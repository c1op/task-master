import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { createConnectionUrl } from "~/utils";
import * as schema from "./schema";

const connectionUrl = createConnectionUrl();

const queryClient = postgres(connectionUrl);
export const db = drizzle(queryClient, { schema });
