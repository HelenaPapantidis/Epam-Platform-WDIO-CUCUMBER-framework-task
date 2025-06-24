 class BasePage {


    async open(path) {
        await browser.url(path);
    }


async clearInput(element) {
  await element.click();
  await element.doubleClick();
  await browser.keys(['Control', 'a']);
  await browser.keys('Delete');
}


 }

 

  module.exports = BasePage;  
