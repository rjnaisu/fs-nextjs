import { defineConfig } from "@playwright/test";
import * as dotenv from "dotenv";

const envFile = process.env.CI || process.env.NODE_ENV === "test" ? ".env.test" : ".env.local";
dotenv.config({ path: envFile, quiet: true });

export default defineConfig({
  testDir: "./tests",
  // Each test resets the same database, so tests must run one at a time.
  workers: 1,
  use: {
    baseURL: "http://localhost:3000",
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    // Pass the loaded database/auth settings to Next.js while keeping dev mode.
    env: { NODE_ENV: "development" },
  },
});
