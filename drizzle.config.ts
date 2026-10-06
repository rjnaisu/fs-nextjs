import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// The workflow creates .env.test without exporting NODE_ENV to the process.
const envFile = process.env.CI || process.env.NODE_ENV === "test" ? ".env.test" : ".env.local";
dotenv.config({ path: envFile, quiet: true });

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
