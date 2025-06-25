/**
 * WDIO configuration file for running Cucumber BDD tests with Allure reporting.
 * @module wdio.conf
 */

import { browser } from '@wdio/globals';
import allure from 'allure-commandline';
import fs from 'fs';
import path from 'path';
import 'dotenv/config'


/**
 * @type {import('@wdio/types').Options.Testrunner & { capabilities: WebdriverIO.Capabilities[] }}
 */
export const config = {
  runner: "local",

  /**
   * Feature files location.
   * @type {string[]}
   */
  specs: ["./src/features/**/*.feature"],
  exclude: [],

  /**
   * Maximum number of parallel instances.
   * @type {number}
   */
  maxInstances: 2,

  /**
   * Browser capabilities.
   * @type {Array<Object>}
   */
  capabilities: [
    { browserName: "chrome" },
    { browserName: "MicrosoftEdge" }
  ],

  logLevel: "debug",
  bail: 0,
  baseUrl: process.env.BASE_URL,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  framework: "cucumber",

  /**
   * Reporters configuration.
   * @type {Array}
   */
  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "allure-results",
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  /**
   * Cucumber options.
   * @type {Object}
   */
  cucumberOpts: {
    require: ["./src/step-definitions/steps.js"],
    backtrace: false,
    requireModule: [],
    dryRun: false,
    failFast: false,
    snippets: true,
    source: true,
    strict: false,
    tagExpression: "",
    timeout: 60000,
    ignoreUndefinedDefinitions: false,
  },

  //
  // HOOKS
  //

  /**
   * Hook executed before the test run starts.
   */
  onPrepare: function () {
      const resultsDir = path.join(process.cwd(), 'allure-results');
      if (fs.existsSync(resultsDir)) {
        fs.rmSync(resultsDir, { recursive: true });
        console.log(" Cleaned previous Allure results");
      }
  },

  /**
   * Hook executed before each scenario.
   * @param {object} world - Cucumber world object.
   * @param {object} context - Scenario context.
   */
  beforeScenario: async function (world, context) {
    const browserName = browser.capabilities.browserName;
    // Write browser name to environment.properties for Allure
    const resultsDir = path.join(process.cwd(), 'allure-results');
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true });
    }
    fs.writeFileSync(
      path.join(resultsDir, 'environment.properties'),
      `Browser=${browserName}\n`,
      { flag: 'a' }
    );
    console.log(`▶ Starting scenario: ${world.pickle.name} on ${browserName}`);
  },

  /**
   * Hook executed after each step.
   * @param {object} step - Step object.
   * @param {object} scenario - Scenario object.
   * @param {object} result - Step result.
   */
  afterStep: async function (step, scenario, result) {
    if (!result.passed) {
      console.error(` Step failed: ${step.text}`);
      console.error(` Error: ${JSON.stringify(result.error, null, 2)}`);
      await browser.takeScreenshot();
    }
  },

  /**
   * Hook executed after each scenario.
   * @param {object} world - Cucumber world object.
   * @param {object} result - Scenario result.
   * @param {object} context - Scenario context.
   */
  afterScenario: async function (world, result, context) {
    if (!result.passed) {
      console.warn(`🚨 Scenario failed: ${world.pickle.name}`);
      await browser.takeScreenshot();
    }
  },

  /**
   * Hook executed after all tests are done.
   * Generates the Allure report.
   * @returns {Promise<void>}
   */
  onComplete: function () {
    const generation = allure(["generate", "allure-results", "--clean"]);
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("Could not generate Allure report")), 15000);
      generation.on("exit", function () {
        clearTimeout(timeout);
        console.log("✅ Allure report successfully generated");
        resolve();
      });
    });
  }
};
