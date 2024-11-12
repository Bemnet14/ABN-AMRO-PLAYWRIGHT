const { test, expect } = require('@playwright/test');
const users = require('../test-data/Users.js'); // Controleer of het pad klopt

test.describe('User Authentication Tests - Eén gebruiker per keer', () => {
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        
        test(`Test login voor gebruiker ${i + 1}: ${user.email}`, async ({ page }) => {
            await page.goto('http://127.0.0.1:5500/index.html');  // Pas URL aan naar je testomgeving

            // Vul het loginformulier in met de gegevens van de huidige gebruiker
            await page.fill('#email', user.email);
            await page.fill('#password', user.password);
            await page.locator('body > main:nth-child(2) > section:nth-child(1) > form:nth-child(2) > fieldset:nth-child(1) > input:nth-child(6)').click();

           //controleer of user logged in is in local storage
            const loggedUser = await page.evaluate(() => localStorage.getItem('logged'));
            expect(loggedUser).toBe(user.email);
            
            // Controleer of de content zichtbaar is na inloggen
            //await expect(page.locator('#content')).toBeVisible();

            // Controleer of de gebruiker correct is ingelogd in de localStorage
           // const loggedUser = await page.evaluate(() => localStorage.getItem('logged'));
            //expect(loggedUser).toBe(user.email);

             // Klik op het gebruikersicoon om de logout-optie te openen
             await page.locator("(//i[@class='fas fa-user-circle'])[1]").click();

             // Klik op de "Sign Out" knop om uit te loggen
             await page.locator("(//span[normalize-space()='Sign Out'])[1]").click();
 
             // Controleer of de gebruiker is uitgelogd door te verifiëren dat de loginpagina zichtbaar is
             //await expect(page.locator('login')).toBeVisible();
            // Uitloggen voordat de volgende gebruiker wordt getest
            //await page.click('#logout'); // Zorg ervoor dat de juiste selector voor de logout-knop klopt
        });
    }
});
