import { Given, When, Then, Before } from "@wdio/cucumber-framework";
import BasePage from "../pageobjects/base.page";
import LoginPage from "../pageobjects/login.page";
import { getCredentials } from "../testdata/scenario.data";

/**
 * Before hook to extract the relevant scenario tag (e.g., @UC-1, @UC-2, etc.).
 * Scenario tags are stored in the format @UC-<number> in feature file.
 * Stores the tag name in the test context for use in steps.
 */
Before(function (scenario) {
  // Find the first tag that matches @UC-*
  const ucTag = scenario.pickle.tags.find(tag => /^@UC-\d+$/.test(tag.name));
  this.tag = ucTag ? ucTag.name : undefined;
});

/**
 * Navigates to the login page.
 */
Given("I am on the login page", async function () {
  await BasePage.open();
});

/**
 * Types credentials into the specified field.
 * @param {string} field - The field to type into ("username" or "password").
 */
When("I type credentials into {string} field", async function (field) {
  const credentials = getCredentials(this.tag);
  if (!credentials) throw new Error(`No credentials found for user case: ${this.tag}`);
  await LoginPage.setField(field, credentials);
});

/**
 * Clears the specified field.
 * @param {string} field - The field to clear ("username" or "password").
 */
When("I clear the {string} field", async function (field) {
  await LoginPage.clearField(field);
});

/**
 * Clicks the login button.
 */
When('I click on the login button', async function () {
  await LoginPage.clickLoginBtn();
});

/**
 * Logs in with valid credentials for the current scenario tag.
 */
When("I login with valid credentials", async function () {
  const credentials = getCredentials(this.tag);
  if (!credentials) throw new Error(`No credentials found for tag: ${this.tag}`);
  await LoginPage.setField(["username", "password"], credentials);
  await LoginPage.clickLoginBtn();
});

/**
 * Verifies the user is on the expected page with the expected title.
 * @param {string} expectedPage
 * @param {string} expectedTitle
 */
Then('I should be on the {string} page with the title {string}', async function (expectedPage, expectedTitle) {
  await BasePage.expectOnPage(expectedPage, expectedTitle);
});

/**
 * Verifies the expected error message is displayed.
 * @param {string} expectedError
 */
Then("I should see the error message {string}", async function (expectedError) {
  await LoginPage.isErrorMessageDisplayed(expectedError, true);
});