const BasePage = require('./base.page');

class DashboardPage extends BasePage {
  
  get pageTitle() {
    return $('//*[@data-test="title"]');
  }
  
  get pageLogo() {
    return $('//div[@class="app_logo"]');
  }

  async getBrowserTitle() {
    return  await browser.getTitle();
  }

  async getPageTitleText() {
    return await this.pageTitle.getText();
  }
}

module.exports = new DashboardPage();
