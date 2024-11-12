// Keywords.js
const { expect } = require('@playwright/test');

// Validatie van succesvolle login
async function validateLoginSuccess(page, expectedEmail) {
  // Wacht op de pagina en controleer of de content zichtbaar is na inloggen
  await expect(page.locator('#content')).toBeVisible();

  // Verkrijg de ingelogde gebruiker vanuit localStorage
  const loggedUser = await page.evaluate(() => localStorage.getItem('logged'));
  
  // Controleer of de juiste gebruiker is ingelogd
  expect(loggedUser).toBe(expectedEmail);
}

// Validatie van succesvolle logout
async function validateLogout(page) {
  // Controleer of de login-knop weer zichtbaar is na uitloggen
  await expect(page.locator('#login')).toBeVisible();
}

module.exports = { validateLoginSuccess, validateLogout };
