// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests', // Zorg dat dit verwijst naar je map met tests
  outputDir: 'test-results', // Zet de output map naar jouw gewenste locatie

  reporter: [
    ['list'],  // Standaard terminal-output voor het resultaat
    ['html', { outputFolder: 'test-results/html-report' }],  // HTML rapport
   // ['json', { outputFile: 'test-results/test-results.json' }], // JSON rapport
  ],
  
  projects: [
    {
      name: 'Chromium',
      use: {
        browserName: 'chromium',
        outputDir: 'test-results/chromium',  
      },
    },
    {
      name: 'Firefox',
      use: {
        browserName: 'firefox',
        outputDir: 'test-results/firefox',  
      },
    },
    {
      name: 'WebKit',
      use: {
        browserName: 'webkit',
        outputDir: 'test-results/webkit',  
      },
    },
  ],
});
