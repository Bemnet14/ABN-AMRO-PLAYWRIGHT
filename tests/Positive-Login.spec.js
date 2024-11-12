const { test, expect, devices } = require('@playwright/test');
const LoginPage = require('../pageObject/LoginPage');
const ContentPage = require('../pageObject/ContentPage');
const { validateLoginSuccess } = require('../utils/testkeywords');
const users = require('../test-data/Users.js'); // Je gebruikersdata

test.describe('User Authentication Tests - Eén gebruiker per keer', () => {
  
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    
    test(`Test login voor gebruiker ${i + 1}: ${user.email}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const contentPage = new ContentPage(page);
      
      // Ga naar de pagina
      await page.goto('http://127.0.0.1:5500/index.html');  // Pas URL aan naar je testomgeving
      await loginPage.login(user.email, user.password);

       

        await contentPage.validateMenuItems(); // Correcte aanroep via de instantie

    // Valideer de content teksten
        await contentPage.validateContentTexts(); // Correcte aanroep via de instantie

      
      // Valideer of het inloggen succesvol was
      await validateLoginSuccess(page, user.email);
      
      // Logout na succesvolle login
      await loginPage.logout();
      
      // Valideer of de tekst zichtbaar is na uitloggen
      const logoutMessage = page.locator("text='Automation doesn't stop at testing, it's just a beginning!'");
      await expect(logoutMessage).toBeVisible();  // Controleer of de tekst zichtbaar is
    });
  }

  // Testcase: Login met een gebruikersnaam die zowel hoofdletters als kleine letters bevat
  test('Login met een gebruikersnaam die zowel hoofdletters als kleine letters bevat', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const user = users[0];  // Eerste gebruiker

    // Ga naar de pagina
    await page.goto('http://127.0.0.1:5500/index.html');  // Pas URL aan naar je testomgeving
    
    // Login met een gebruikersnaam met zowel hoofdletters als kleine letters
    await loginPage.login(user.email.toUpperCase(), user.password);  // Hoofdletters in email

    // Valideer of de tekst zichtbaar is na uitloggen
    const logoutMessage = page.locator("text='Automation doesn't stop at testing, it's just a beginning!'");
    await expect(logoutMessage).toBeVisible();  // Controleer of de tekst zichtbaar is
  });

  // Testcase: Login in verschillende browsers (Chrome, Firefox, Edge)
  const browsers = ['chromium', 'firefox', 'webkit'];

  for (const browserName of browsers) {
    test(`Login met ${browserName} browser`, async ({ browser }) => {
      const context = await browser.newContext();
      const page = await context.newPage();
      const loginPage = new LoginPage(page);
      const user = users[0];  // Eerste gebruiker voor test

      // Ga naar de pagina
      await page.goto('http://127.0.0.1:5500/index.html');  // Pas URL aan naar je testomgeving

      // Voer de login uit
      await loginPage.login(user.email, user.password);

      // Valideer of het inloggen succesvol was
      await validateLoginSuccess(page, user.email);

      // Logout na succesvolle login
      await loginPage.logout();

      // Controleer of de logout-berichttekst zichtbaar is
      const logoutMessage = page.locator("text='Automation doesn't stop at testing, it's just a beginning!'");
      await expect(logoutMessage).toBeVisible();  // Controleer of de tekst zichtbaar is

      // Sluit de context na de test
      await context.close();
    });
  }
});
