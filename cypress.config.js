const { defineConfig } = require('cypress');
const { allureCypress } = require('allure-cypress/reporter');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev',

    env: {
      apiUrl: 'https://serverest.dev'
    },

    setupNodeEvents(on, config) {
      allureCypress(on, config);

      return config;
    },

    viewportWidth: 1440,
    viewportHeight: 900,

    video: true,

    retries: {
      runMode: 2,
      openMode: 0
    }
  }
});
