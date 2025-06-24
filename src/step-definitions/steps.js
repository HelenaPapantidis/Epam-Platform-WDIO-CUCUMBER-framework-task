const { Given, When, Then } = require("@wdio/cucumber-framework");
const LoginPage = require("../pageobjects/login.page");
const DashboardPage = require("../pageobjects/dashboard.page");
const assert = require("assert");

const validCredentials = {
  username: "standard_user",
  password: "secret_sauce",
};


Given("I am on the login page", async () => {
  await browser.url("/");
});

When("I type credentials into {string} field", async (field) => {
  if (field === "username") {
    await LoginPage.setUsername("anyName");
  } else if (field === "password") {
    await LoginPage.setPassword("anypassword");
  } else {
    throw new Error("No such field");
  }
});

When("I clear the {string} field", async (field) => {
  if (field === "username") {
    await LoginPage.clearUsername();
  } else if (field === "password") {
    await LoginPage.clearPassword();
  } else {
    throw new Error("No such field");
  }
});


When('I click on the login button', async () => {
  await LoginPage.clickLoginBtn();
});

When("I login with valid credentials", async () => {
  await LoginPage.login(validCredentials.username, validCredentials.password);
});

Then("I should see the title {string}", async (expectedTitle) => {
  const title = await DashboardPage.getBrowserTitle();
  assert.strictEqual(title, expectedTitle);
});

Then("I should be redirected to the inventory page", async () => {
  const currentUrl = await browser.getUrl();
  assert.strictEqual(currentUrl, "https://www.saucedemo.com/inventory.html");
});

Then("I should see the error message {string}", async (expectedError) => {
  const errorText = await LoginPage.getErrorMsgtext();
  assert.strictEqual(errorText, expectedError);
});