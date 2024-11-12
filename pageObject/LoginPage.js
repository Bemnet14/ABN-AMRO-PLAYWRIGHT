class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = '#email';
    this.passwordInput = '#password';
    this.loginButton = 'body > main:nth-child(2) > section:nth-child(1) > form:nth-child(2) > fieldset:nth-child(1) > input:nth-child(6)';
    this.userIcon = "(//i[@class='fas fa-user-circle'])[1]";
    this.logoutButton = "(//span[normalize-space()='Sign Out'])[1]";
    this.url = 'http://127.0.0.1:5500/index.html'; // URL naar de loginpagina
    this.errorMessageLocator = '.error-message';  // Locatie van de foutmelding (kan aangepast worden naar de juiste selector)
  }

  // Ga naar de loginpagina
  async goToLoginPage() {
    await this.page.goto(this.url);
  }

  // Vul inloggegevens in en klik op de login knop
  async login(email, password) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.locator(this.loginButton).click();
  }

  // Verkrijg de gebruiker die ingelogd is vanuit localStorage
  async getLoggedUser() {
    return await this.page.evaluate(() => localStorage.getItem('logged'));
  }

  // Klik op het gebruikersicoon om uit te loggen
  async logout() {
    await this.page.locator(this.userIcon).click();
    await this.page.locator(this.logoutButton).click();
  }

  // Verkrijg de foutmelding na een mislukte login
  async getErrorMessage() {
    return await this.page.locator(this.errorMessageLocator);
  }

  // Zorg ervoor dat de login-knop zichtbaar is
  async getLoginButton() {
    return this.page.locator(this.loginButton);
  }
}

module.exports = LoginPage;
