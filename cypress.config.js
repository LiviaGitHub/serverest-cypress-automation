const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  e2e: {
    baseUrl: "https://front.serverest.dev",
    env: { apiUrl: "https://serverest.dev" },
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },
    viewportWidth: 1440,
    viewportHeight: 900,
    video: true,
    retries: { runMode: 2, openMode: 0 },
  },
});
