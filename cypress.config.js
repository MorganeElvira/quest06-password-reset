const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    MAILSLURP_API_KEY:
      "3675590b6f4f318510a092a36e77f9b982c1ae17a1e07317da1c87aea73f6c94",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultCommandTimeout: 40000,
    responseTimeout: 40000,
    requestTimeout: 40000,
  },
});
