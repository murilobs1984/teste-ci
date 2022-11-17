const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    requestTimeout: 70000, 

    defaultCommandTimeout: 70000, 
  
    chromeWebSecurity: false,
  },
});
