/**
 * add .env by using dotenv package - store sensitive data like credentials there NEVER PUSH ANYTHING SENSITIVE (e.g. credentials, links, api keys) TO GITHUB
 *   Example: Move `validCredentials` from steps.js to a .env file and load with dotenv.
 *   // .env
 *   USERNAME=standard_user
 *   PASSWORD=secret_sauce
 *   // steps.js
 *   import 'dotenv/config';
 *   const validCredentials = { username: process.env.USERNAME, password: process.env.PASSWORD };
 *
 * add jsdoc for each method
 *   Example: In login.page.js, add above each method:
 *   
 *    * Set the username field
 *    * @param {string} username
 *    
 *   async setUsername(username) { ... }
 *
 * replace require with import for better readability
 *   Example: In dashboard.page.js, use:
 *   import BasePage from './base.page.js';
 *
 * use native webdriverio api (expect instead of assert, element methods instead of node ones, etc.)
 *   Example: In steps.js, replace:
 *   assert.strictEqual(title, expectedTitle);
 *   // with
 *   await expect(browser).toHaveTitle(expectedTitle);
 *
 * add level of abstraction (don't assert in tests - use classes for that)
 *   Example: Move assertion logic into page objects, e.g.:
 *   async isErrorMessageDisplayed(expected, isDisplayed) { ... }
 *   // Then in steps.js: await LoginPage.isErrorMessageDisplayed(expectedError, true);
 *
 * generalize methods by passing required parameters as arguments (e.g., field names, credentials)
 *   Example: In login.page.js, instead of setUsername/setPassword, use:
 *   async setField(fieldName, value) { ... }
 *
 * Move hardcoded selectors to constants for easier updates.
 *   Example: In login.page.js, at the top:
 *   const SELECTORS = { username: '//*[@data-test="username"]', ... };
 *   // Then use: $(SELECTORS.username)
 *
 * Avoid console.log in page objects; use logger if needed.
 *   Example: In login.page.js, replace console.log with a logger or remove it completely.
 *
 * add type auto-completion/suggestions by using jsconfig.json for better developer experience
 *
 *
 * always be consistent with your code style (e.g., use arrow functions or regular functions but not both in the same file, semicolons, formatting etc.)
 *   Example: In base.page.js, use consistent function style and always end statements with semicolons.
 *
 * move test data preparation to a separate file (e.g., scenario.data.js) and use it in tests in before() hook
 *   Example: Create scenario.data.js:
 *   export const { validCredentials: { ... } };
 *   // In steps.js, import and use in Before hook.
 */