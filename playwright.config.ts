import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  // Each test resets the same database, so tests must run one at a time.
  workers: 1,
  use: {
    baseURL: "http://localhost:3000",
  },
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
