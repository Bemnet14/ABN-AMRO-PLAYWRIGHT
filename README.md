ABN AMRO Playwright Test Automation Framework

This project contains automated tests designed to verify the functionality of the ABN AMRO web application. The tests are written using Playwright and are divided into different scenarios, such as:

Positive login tests
Negative login tests
UI validation
Browser compatibility tests
The tests support Chromium, Firefox, and WebKit (Safari).

Installation
Installation Steps:
Clone the repository to your local machine:

bash
Code kopiëren
git clone <repository-url>
cd <project-directory>
Install dependencies: Install Playwright and the necessary browser binaries:

bash
Code kopiëren
npm install
Install Playwright browsers: To make Playwright work correctly, you need to install the browsers:


bash
Code kopiëren
npm install <framework-dependency>
Suggested folder structure:
The project is structured as follows:

tests/: Contains all test files.
pageObject/: Contains page objects for reusable actions and selectors.
test-data/: Contains test data, such as user credentials.
test-results/: Contains test result outputs, such as logs and reports.
Running Tests
Running Tests in a Single Browser:
To run tests in a specific browser, use the following command. This will open the browser in headless mode (without UI):

bash
Code kopiëren
npx playwright test tests/Positive-Login.spec.js --headed


Running Tests in Multiple Browsers:
To run tests in multiple browsers such as Chromium, Firefox, and WebKit, use the following configuration, which will automatically run tests in these browsers:

bash
Code kopiëren
npx playwright test --project=Chromium
npx playwright test --project=Firefox
npx playwright test --project=WebKit
Or to run tests across all browsers simultaneously, use:

bash
Code kopiëren
npx playwright test
Test Reports:
Test results are saved in the test-results/ folder. You can view the reports in the test-results/html-report folder. These reports contain detailed information about the tests, including which tests passed or failed and screenshots of any failed tests.

Test Results
Test results are stored in the test-results/ folder. It contains reports, logs, and any debugging files. The HTML report can be found in test-results/html-report, and the JSON report in test-results/test-results.json.

Viewing Reports:
After running the tests, you can view the results by opening the index.html file in the test-results/html-report folder in your browser. The report provides a visual representation of the tests, including which tests passed or failed.

Configuration
Playwright Configuration File (playwright.config.js)
The configuration file playwright.config.js contains settings like:

The locations of your tests and test results.
The different browser projects (Chromium, Firefox, WebKit).
Configuring different reporters, such as HTML reports and JSON output.

.gitignore
The .gitignore file is configured to exclude unnecessary files.
