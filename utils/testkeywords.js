// Keywords.js
const { expect } = require('@playwright/test');


// Validation of successful login
async function validateLoginSuccess(page, expectedEmail) {
   // Wait for the page and check if the content is visible after logging in
  await expect(page.locator('#content')).toBeVisible();

    // Get the logged-in user from localStorage
  const loggedUser = await page.evaluate(() => localStorage.getItem('logged'));
  
   // Check if the correct user is logged in
  expect(loggedUser).toBe(expectedEmail);
}

// Validation of successful logout
async function validateLogout(page) {
  // Check if the login button is visible again after logging out
  await expect(page.locator('#login')).toBeVisible();
}

module.exports = { validateLoginSuccess, validateLogout };
