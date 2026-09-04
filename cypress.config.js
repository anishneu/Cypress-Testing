import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",

    specPattern: "cypress/e2e/**/*.spec.ts",

    supportFile: "cypress/support/e2e.ts",

    testIsolation: false,

    screenshotOnRunFailure: true,

    video: false,

    defaultCommandTimeout: 10000,

    pageLoadTimeout: 60000,

    requestTimeout: 30000,

    responseTimeout: 30000,

    setupNodeEvents(on, config) {
      return config;
    },
  },
});