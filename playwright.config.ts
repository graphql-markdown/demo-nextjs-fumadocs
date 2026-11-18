import { defineConfig, devices } from "@playwright/test";

// Stabilize font rendering across machines (recommended by Argos).
const launchOptions = {
  args: ["--disable-lcd-text", "--font-render-hinting=none"],
};

const port = Number(process.env.VISUAL_PORT ?? 4173);
// The site is exported under a base path (see next.config.mjs).
const basePath = "/demo-nextjs-fumadocs";

export default defineConfig({
  testDir: "./tests/visual",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [
    [process.env.CI ? "dot" : "list"],
    [
      "@argos-ci/playwright/reporter",
      { uploadToArgos: !!process.env.CI && !!process.env.ARGOS_TOKEN },
    ],
  ],
  use: {
    // Trailing slash so relative `page.goto("docs/...")` keeps the base path.
    baseURL: `http://localhost:${port}${basePath}/`,
    trace: "on-first-retry",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], launchOptions } },
    { name: "mobile", use: { ...devices["Pixel 7"], launchOptions } },
  ],
  webServer: {
    // Static output of `npm run build` (`out/`), mounted under the base path.
    command: `mkdir -p .visual && ln -sfn ../out .visual${basePath} && npx serve -l ${port} .visual`,
    url: `http://localhost:${port}${basePath}/`,
    reuseExistingServer: !process.env.CI,
    env: { NO_UPDATE_CHECK: "1" },
  },
});
