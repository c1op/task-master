import { sql } from "drizzle-orm";
import { env } from "~/env";

export const createConnectionUrl = () =>
  `postgres://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`;

export const uuidDefault = sql`uuid_generate_v4()`;
