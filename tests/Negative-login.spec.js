const { test, expect } = require('@playwright/test');
const LoginPage = require('../pageObject/LoginPage');
const users = require('../test-data/Users.js'); // Gebruikersdata importeren

test.describe('User Authentication Test - Edge Cases and Invalid Login', () => {

  // Testcase: Login met onjuist wachtwoord voor geldige gebruikersnaam
  test('Login met onjuist wachtwoord voor geldige gebruikersnaam', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const user = users[0];  // Eerste gebruiker

    // Ga naar de loginpagina
    await loginPage.goToLoginPage();

    // Acties uitvoeren
    await loginPage.login(user.email, 'WrongPassword123');  // Onjuist wachtwoord

    // Validatie dat de login-knop zichtbaar is na mislukte login
    const loginButton = await loginPage.getLoginButton();
    await expect(loginButton).toBeVisible();  // Controleer of de login-knop zichtbaar is
  });

  // Testcase: Login met onjuiste gebruikersnaam voor geldig wachtwoord
  test('Login met onjuiste gebruikersnaam voor geldig wachtwoord', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const user = users[1];  // Tweede gebruiker

    // Ga naar de loginpagina
    await loginPage.goToLoginPage();

    // Acties uitvoeren
    await loginPage.login('WrongUser@Example.com', user.password);  // Onjuiste gebruikersnaam

    // Validatie dat de login-knop zichtbaar is na mislukte login
    const loginButton = await loginPage.getLoginButton();
    await expect(loginButton).toBeVisible();  // Controleer of de login-knop zichtbaar is
  });

  // Testcase: Login met leeg gebruikersnaamveld
  test('Login met leeg gebruikersnaamveld', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const user = users[2];  // Derde gebruiker

    // Ga naar de loginpagina
    await loginPage.goToLoginPage();

    // Acties uitvoeren
    await loginPage.login('', user.password);  // Leeg gebruikersnaamveld

    // Validatie dat de login-knop zichtbaar is na mislukte login
    const loginButton = await loginPage.getLoginButton();
    await expect(loginButton).toBeVisible();  // Controleer of de login-knop zichtbaar is
  });

  // Testcase: Login met leeg wachtwoordveld
  test('Login met leeg wachtwoordveld', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const user = users[0];  // Eerste gebruiker

    // Ga naar de loginpagina
    await loginPage.goToLoginPage();

    // Acties uitvoeren
    await loginPage.login(user.email, '');  // Leeg wachtwoordveld

    // Validatie dat de login-knop zichtbaar is na mislukte login
    const loginButton = await loginPage.getLoginButton();
    await expect(loginButton).toBeVisible();  // Controleer of de login-knop zichtbaar is
  });

  // Testcase: Login met gebruikersnaam die niet bestaat in het systeem
  test('Login met gebruikersnaam die niet bestaat in het systeem', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Ga naar de loginpagina
    await loginPage.goToLoginPage();

    // Acties uitvoeren
    await loginPage.login('NonExistingUser@Example.com', 'SomePassword123');  // Niet-bestaande gebruikersnaam

    // Validatie dat de login-knop zichtbaar is na mislukte login
    const loginButton = await loginPage.getLoginButton();
    await expect(loginButton).toBeVisible();  // Controleer of de login-knop zichtbaar is
  });
});
