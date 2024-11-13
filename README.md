# ABN AMRO Playwright Test Automation Framework

This project contains automated tests designed to verify the functionality of the ABN AMRO web application. The tests are written using Playwright and are divided into different scenarios, such as:

- Positive login tests
- Negative login tests
- UI validation
- Browser compatibility tests

The tests support Chromium, Firefox, and WebKit (Safari).

## Installation

### Installation Steps:

1. Clone the repository to your local machine:

    ```bash
    git clone <https://github.com/Bemnet14/ABN-AMRO-PLAYWRIGHT>
    cd <ABN-AMRO-PLAYWRIGHT
>
    ```

2. Install dependencies: Install Playwright and the necessary browser binaries:

    ```bash
    npm install
    ```

3. Install Playwright browsers: To make Playwright work correctly, you need to install the browsers:

    ```bash
    npm install 
    ```

### Suggested Folder Structure:

The project is structured as follows:

- **tests/**: Contains all test files.
- **pageObject/**: Contains page objects for reusable actions and selectors.
- **test-data/**: Contains test data.
- **test-results/**: Contains test result outputs.

## Running Tests

### Running Tests in a Multiple Browsers:

To run tests across all browsers simultaneously, use:  This will open the browser in headless mode (without UI):

```bash
npx playwright test

### Running Tests in Multiple Browsers:

To run tests in multiple browsers such as **Chromium**, **Firefox**, and **WebKit**, use the following commands to specify each browser individually:

```bash
npx playwright test --project=Chromium
npx playwright test --project=Firefox
npx playwright test --project=WebKit

Test Reports:
Test results are saved in the test-results/ folder. You can view the reports in the test-results/html-report folder. 

Viewing Reports:
After running the tests, you can view the results by opening the index.html file in the test-results/html-report folder in your browser.

.gitignore
The .gitignore file is configured to exclude unnecessary files.