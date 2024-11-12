const { test, expect } = require('@playwright/test');

test.describe('User Authentication Tests', () => {

    test.beforeEach(async ({ page }) => {
        // Bezoek de pagina
        await page.goto('http://127.0.0.1:5500/index.html'); // vervang dit met jouw test URL
        await page.evaluate(() => localStorage.clear()); // maak localStorage schoon voor elke test
    });

    // Happy Path: Succesvol inloggen
    test('should log in successfully with correct credentials', async ({ page }) => {
        await page.fill('#email', 'admin@admin.com');  // correcte mock gebruiker
        await page.fill('#password', '2020');
        await page.click('#login');  // Gebruik de juiste id van de login-knop
        
        // Controleer of de inhoud wordt weergegeven na succesvol inloggen
        await expect(page.locator('#content')).toBeVisible();
        
        // Controleer of de login UI verborgen is
        await expect(page.locator('#login')).toBeHidden();

        // Controleer of de juiste waarde in localStorage is gezet
        const loggedUser = await page.evaluate(() => localStorage.getItem('logged'));
        expect(loggedUser).toBe('admin@admin.com');
    });

    // Negative Path: Mislukt inloggen
    test('should not log in with incorrect credentials', async ({ page }) => {
        await page.fill('#email', 'admin@admin.com');
        await page.fill('#password', 'wrongpassword');
        await page.click('#login');  // Gebruik de juiste id van de login-knop
        
        // Controleer of de login UI zichtbaar blijft en inhoud niet getoond wordt
        await expect(page.locator('#login')).toBeVisible();
        await expect(page.locator('#content')).toBeHidden();
        await expect(page.locator('#navigation')).toBeHidden();
        
        // Controleer dat de localStorage 'logged' niet ingesteld is
        const loggedUser = await page.evaluate(() => localStorage.getItem('logged'));
        expect(loggedUser).toBeNull();
    });

    // UI Validatie bij uitloggen
    test('should log out successfully', async ({ page }) => {
        // Simuleer een gebruiker die al is ingelogd
        await page.evaluate(() => {
            localStorage.setItem('logged', 'admin@admin.com');
        });
        await page.reload(); // Refresh om de loginstatus te laden

        // Log uit
        await page.click('#logout');  // Gebruik de juiste id van de logout-knop

        // Controleer dat de login UI weer zichtbaar is
        await expect(page.locator('#login')).toBeVisible();
        await expect(page.locator('#content')).toBeHidden();
        await expect(page.locator('#navigation')).toBeHidden();

        // Controleer dat de localStorage 'logged' is verwijderd
        const loggedUser = await page.evaluate(() => localStorage.getItem('logged'));
        expect(loggedUser).toBeNull();
    });

    // Test de `showUser` functie
    test('should toggle logout button visibility using showUser function', async ({ page }) => {
        // Trigger `showUser` om de logout knop te tonen
        await page.evaluate(() => showUser());
        await expect(page.locator('#logout')).toBeVisible();

        // Trigger `showUser` opnieuw om de logout knop te verbergen
        await page.evaluate(() => showUser());
        await expect(page.locator('#logout')).toBeHidden();
    });

    // Persistente Login-status na herladen
    test('should retain login status after page reload', async ({ page }) => {
        await page.fill('#email', 'admin@admin.com');
        await page.fill('#password', '2020');
        await page.click('#login');  // Gebruik de juiste id van de login-knop

        // Controleer login status
        await expect(page.locator('#content')).toBeVisible();

        // Herlaad de pagina en controleer of login status behouden blijft
        await page.reload();
        await expect(page.locator('#content')).toBeVisible();
        await expect(page.locator('#login')).toBeHidden();
    });
});
