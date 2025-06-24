const BasePage = require("./base.page");

class LoginPage extends BasePage {
  // Selectors
  get username() {
    return $('//*[@data-test="username"]');
  }

  get password() {
    return $('//*[@data-test="password"]');
  }

  get loginBtn() {
    return $('//*[@data-test="login-button"]');
  }

  get errorMessage() {
    return $('//h3[@data-test="error"]');
  }

  // Actions
  async setUsername(username) {
    await this.username.waitForExist({ timeout: 5000 });
    await this.username.setValue(username);
  }

  async setPassword(password) {
    await this.password.waitForExist({ timeout: 5000 });
    await this.password.setValue(password);
  }

  async clearUsername() {
    await this.username.waitForExist({ timeout: 5000 });
    await this.clearInput(this.username);
  }

  async clearPassword() {
    await this.password.waitForExist({ timeout: 5000 });
    await this.clearInput(this.password);
  }

  async clickLoginBtn() {
    await this.loginBtn.waitForClickable({ timeout: 5000 });
    await this.loginBtn.click();
  }

  async login(username, password) {
    await this.setUsername(username);
    await this.setPassword(password);
    await this.clickLoginBtn();
  }

  async getErrorMsgtext() {
    try {
      await this.errorMessage.waitForDisplayed({ timeout: 5000 });
      const text = await this.errorMessage.getText();
      console.log("Error message text is:", text);
      return text;
    } catch (err) {
      console.warn("Error message not found.");
      return "";
    }
  }
}

module.exports = new LoginPage();
