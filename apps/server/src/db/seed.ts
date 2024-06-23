import { db } from "./index";
import { users } from "./schema";

const testUser: typeof users.$inferInsert = {
  username: "admin",
  hashed_password: "733rxvZwS1qtOrN6",
};

await db.insert(users).values(testUser);

process.exit(0);
