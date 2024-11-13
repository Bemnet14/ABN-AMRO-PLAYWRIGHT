// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',



  reporter: [
    ['html', { outputFolder: 'reports/html-report' }],  
  ],
  
  projects: [
    {
      name: 'Chromium',
      use: {
        browserName: 'chromium',
      },
    },
    {
      name: 'Firefox',
      use: {
        browserName: 'firefox',
      },
    },
    {
      name: 'WebKit',
      use: {
        browserName: 'webkit',
      },
    },
  ],
});
