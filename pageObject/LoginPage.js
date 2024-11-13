class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = '#email';
    this.passwordInput = '#password';
    this.loginButton = 'body > main:nth-child(2) > section:nth-child(1) > form:nth-child(2) > fieldset:nth-child(1) > input:nth-child(6)';
    this.userIcon = "(//i[@class='fas fa-user-circle'])[1]";
    this.logoutButton = "(//span[normalize-space()='Sign Out'])[1]";
    this.url = 'http://127.0.0.1:5500/index.html'; 
  
  }

  // Navigate to the login page
  async goToLoginPage() {
    await this.page.goto(this.url);
  }

  // Fill in login credentials and click the login button
  async login(email, password) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.locator(this.loginButton).click();
  }

  /// Get the logged-in user from localStorage
  async getLoggedUser() {
    return await this.page.evaluate(() => localStorage.getItem('logged'));
  }

  // Click on the user icon to log out
  async logout() {
    await this.page.locator(this.userIcon).click();
    await this.page.locator(this.logoutButton).click();
  }

  // Ensure the login button is visible
  async getLoginButton() {
    return this.page.locator(this.loginButton);
  }
}

module.exports = LoginPage;
