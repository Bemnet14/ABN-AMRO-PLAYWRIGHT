const { test, expect, devices } = require('@playwright/test');
const LoginPage = require('../pageObject/LoginPage');
const ContentPage = require('../pageObject/ContentPage');
const { validateLoginSuccess } = require('../utils/testkeywords');
const users = require('../test-data/Users.js'); 

test.describe('Positive Login Test Cases', () => {
  
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    
    test(`should log in successfully with correct credentials, should log out succesfully ${i + 1}: ${user.email}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const contentPage = new ContentPage(page);
      
      // Go to the page
      await page.goto('http://127.0.0.1:5500/index.html');  
      await loginPage.login(user.email, user.password);

      // Validate if the login was successful
      await validateLoginSuccess(page, user.email);
      // Validate the content texts
      await contentPage.validateMenuItems(); 
      await contentPage.validateContentTexts(); 
      
      // Log out after successful login
      await loginPage.logout();
      
      // Validate if the text is visible after logging out
      const logoutMessage = page.locator("text='Automation doesn't stop at testing, it's just a beginning!'");
      await expect(logoutMessage).toBeVisible();  
    });
  }

  // Testcase: Log in with a username that contains both upper and lower case letters
  test('Log in with a username that contains both upper and lower case letters', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const user = users[0];  

    // Go to the page
    await page.goto('http://127.0.0.1:5500/index.html');  
    
    // Login with a username that contains both upper and lower case letters
    await loginPage.login(user.email.toUpperCase(), user.password);  // Uppercase letters in email

    await validateLoginSuccess(page, user.email);
    // Validate the content texts
    await contentPage.validateMenuItems(); 
    await contentPage.validateContentTexts(); 

     // Validate if the text is visible after logging out
    const logoutMessage = page.locator("text='Automation doesn't stop at testing, it's just a beginning!'");
    await expect(logoutMessage).toBeVisible();  
  });

});
