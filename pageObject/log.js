// pages/loginPage.js
class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = '#email';
        this.passwordInput = '#password';
        this.loginButton = '#login';
    }

    async enterEmail(email) {
        await this.page.fill(this.emailInput, email);
    }

    async enterPassword(password) {
        await this.page.fill(this.passwordInput, password);
    }

    async clickLogin() {
        await this.page.click(this.loginButton);
    }

    async loginWithCredentials(email, password) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLogin();
    }
}
module.exports = LoginPage;
