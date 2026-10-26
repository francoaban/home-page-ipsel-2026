// playwright.config.js — tests E2E del sitio IPSEL.
//
//   npm run test:e2e        corre todo (desktop + móvil)
//   npm run test:e2e -- --ui  modo interactivo
//
// El servidor estático (scripts/serve.js) se levanta solo; no requiere Python
// ni dependencias extra.
const { defineConfig, devices } = require("@playwright/test");

const PORT = Number(process.env.PORT || 4173);
const baseURL = `http://127.0.0.1:${PORT}`;

module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",

  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "off",
  },

  webServer: {
    command: `node scripts/serve.js ${PORT}`,
    url: `${baseURL}/index.html`,
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },

  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 900 } },
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 7"] },
    },
  ],
});
