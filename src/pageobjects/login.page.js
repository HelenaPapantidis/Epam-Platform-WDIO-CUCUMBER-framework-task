import { expect } from "expect-webdriverio";
import BasePage from "./base.page";
import { $, browser } from '@wdio/globals';

const SELECTORS = {
  username: '//*[@data-test="username"]',
  password: '//*[@data-test="password"]',
  loginBtn: '//*[@data-test="login-button"]',
  errorMessage: '//h3[@data-test="error"]',
};

class LoginPage extends BasePage {
  get username() {
    return $(SELECTORS.username);
  }

  get password() {
    return $(SELECTORS.password);
  }

  get loginBtn() {
    return $(SELECTORS.loginBtn);
  }

  get errorMessage() {
    return $(SELECTORS.errorMessage);
  }

  // Actions

  /**
   * Clicks login button.
   * @returns {Promise<void>}
   */
  async clickLoginBtn() {
    await this.loginBtn.waitForClickable({ timeout: 5000 });
    await this.loginBtn.click();
  }

    /**
   * Sets the value for the specified field(s) ('username', 'password') using provided credentials.
   * @param {'username'|'password'|Array<'username'|'password'>} field - The field or array of fields to set.
   * @param {{username: string, password: string}} [credentials] - Optional credentials object.
   *   If not provided, defaults to { username: '', password: '' }.
   * @returns {Promise<void>}
   */
  async setField(field, credentials = { username: '', password: '' }) {
    if (Array.isArray(field)) {
      for (const f of field) {
        await this.setField(f, credentials);
      }
      return;
    }
    const element = field === 'username' ? (await this.username) : (await this.password);
    const value = field === 'username' ? credentials.username : credentials.password;
    await this.clearField(field);
    await element.setValue(value);
  }

  /**
   * Clears the specified field.
   * @param {'username'|'password'} field
   * @returns {Promise<void>}
   */
  async clearField(field) {
    const element = field === 'username' ? (await this.username) : (await this.password);
    await element.waitForEnabled({ timeout: 5000 });
    await element.click();
    await browser.keys(['Control', 'a']);
    await browser.keys('Delete');
  }

  // verification methods

  /**
   * Checks if the error message is displayed and optionally verifies its text.
   * @param {string} expectedText - The expected error message text to verify.
   * @param {boolean} [shouldBeDisplayed=true] - Whether the error message should be displayed.
   * @returns {Promise<void>}
   */
  async isErrorMessageDisplayed(expectedText, shouldBeDisplayed = true) {
    const isDisplayed = await this.errorMessage.waitForDisplayed({ timeout: 5000 });

    if (shouldBeDisplayed) {
      expect(isDisplayed).toBe(true);
      const actualText = await this.errorMessage.getText();
      expect(actualText).toContain(expectedText);
    } else {
      expect(isDisplayed).toBe(false,);
    }
  }
}

export default new LoginPage();
