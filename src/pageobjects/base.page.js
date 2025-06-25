import { browser, expect } from '@wdio/globals';

class BasePage {
  static async open(path = '') {
    await browser.url(path);
  }

  /**
* Verifies the current URL and page title.
* @param {string} expectedPage
* @param {string} expectedTitle
*/
  static async expectOnPage(expectedPage, expectedTitle) {
    const baseUrl = process.env.BASE_URL;
    const expectedUrl = `${baseUrl}/${expectedPage}.html`;
    await expect(browser).toHaveUrl(expectedUrl);
    await expect(browser).toHaveTitle(expectedTitle);
  }
}

export default BasePage;