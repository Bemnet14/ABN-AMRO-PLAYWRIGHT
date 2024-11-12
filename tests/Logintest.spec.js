const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/login');  // Het pad naar je page object

// De gebruiker die we gaan gebruiken in de tests
const users = [
  { email: 'admin@admin.com', password: '2020' }, // Geldige gebruiker
  { email: 'wrong@wrong.com', password: 'wrong' }  // Ongeldige gebruiker
];

test.describe('Login functionaliteit testen', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page); // Maak een nieuwe instantie van het LoginPage-object
    await loginPage.navigate(); // Navigeer naar de loginpagina
  });

  // **Happy Path**: Testen met een geldige gebruiker
  test('moet succesvol inloggen met geldige gebruikersgegevens', async () => {
    const user = users[0]; // Geldige gebruiker

    await loginPage.login(user.email, user.password);
    await loginPage.isLoggedIn(); // Controleer of we succesvol ingelogd zijn
  });

  // **Fout Scenario**: Testen met ongeldige gebruikersgegevens
  test('moet een foutmelding geven bij ongeldige login-gegevens', async () => {
    const user = users[1]; // Ongeldige gebruiker

    await loginPage.login(user.email, user.password);
    await loginPage.showError(); // Controleer of een foutmelding wordt getoond
  });

  // **Uitloggen Scenario**: Testen na inloggen en uitloggen
  test('moet uitloggen na inloggen en klikken op de uitlogknop', async () => {
    const user = users[0]; // Geldige gebruiker

    await loginPage.login(user.email, user.password);
    await loginPage.isLoggedIn(); // Controleer of we succesvol ingelogd zijn

    await loginPage.logOut(); // Log uit
    await loginPage.isLoggedOut(); // Controleer of we uitgelogd zijn
  });

  // **Testen van lege invoervelden**
  test('moet geen inloggen uitvoeren wanneer de velden leeg zijn', async () => {
    await loginPage.login('', ''); // Laat beide velden leeg
    await loginPage.showError(); // Controleer of er een foutmelding is
  });
});
