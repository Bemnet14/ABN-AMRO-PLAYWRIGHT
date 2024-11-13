const { test, expect } = require('@playwright/test');
const LoginPage = require('../pageObject/LoginPage');
const users = require('../test-data/Users.js'); 

test.describe('Negative Login Test Cases', () => {

  //Test case: Login with incorrect password for valid username
  test('Login with incorrect password for valid username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const user = users[0];  // First user

    // Go to the login page
    await loginPage.goToLoginPage();
    await loginPage.login(user.email, 'Incorrectpassword123');  // Incorrect password

   // Validate that the login button is visible after failed login
    const loginButton = await loginPage.getLoginButton();
    await expect(loginButton).toBeVisible();  // Check if the login button is visible
  });

  // Test case: Login with incorrect username and valid password
  test('Login with incorrect username and valid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const user = users[1];  // Second user

     // Go to the login page
    await loginPage.goToLoginPage();
    await loginPage.login('incorrectuser@gmail.com', user.password);  // Incorrect username


    // Validate that the login button is visible after failed login
    const loginButton = await loginPage.getLoginButton();
    await expect(loginButton).toBeVisible();  // Check if the login button is visible
  });

  // Test case: Login with empty username field
  test('Login with empty username field', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const user = users[2];   // Third use

    // Go to the login page
    await loginPage.goToLoginPage();
    await loginPage.login('', user.password);  // Empty username field

    // Validate that the login button is visible after failed login
    const loginButton = await loginPage.getLoginButton();
    await expect(loginButton).toBeVisible();  // Check if the login button is visible
  });

  // Test case: Login with empty password field
  test('Login with empty password field', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const user = users[0];  // First user

     // Go to the login page
    await loginPage.goToLoginPage();
    await loginPage.login(user.email, '');  // Empty password field

    // Validate that the login button is visible after failed loginin
    const loginButton = await loginPage.getLoginButton();
    await expect(loginButton).toBeVisible();  // Check if the login button is visible
  });

  // Test case: Login with username that does not exist in the system
  test('Login with username that does not exist in the system', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Go to the login page
    await loginPage.goToLoginPage();
    await loginPage.login('NonExistingUser@gmail.com', 'Password123');   // Non-existing username

   // Validate that the login button is visible after failed login
    const loginButton = await loginPage.getLoginButton();
    await expect(loginButton).toBeVisible();  // Check if the login button is visible to ensure a user who does not exist in the system cannot access the system
  });
});
