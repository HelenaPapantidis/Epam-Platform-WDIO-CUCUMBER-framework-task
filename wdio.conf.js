const allure = require('allure-commandline');
const fs = require('fs');
const path = require('path');

exports.config = {
  runner: "local",

  specs: ["./src/features/**/*.feature"],
  exclude: [],

  maxInstances: 2,
  capabilities: [
    { browserName: "chrome" },
    { browserName: "MicrosoftEdge" }
  ],

  logLevel: "info",
  bail: 0,
  baseUrl: "https://www.saucedemo.com/",
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  framework: "cucumber",

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

  onPrepare: function () {
    const resultsDir = path.join(__dirname, 'allure-results');
    if (fs.existsSync(resultsDir)) {
      fs.rmSync(resultsDir, { recursive: true });
      console.log(" Cleaned previous Allure results");
    }
  },

  beforeScenario: async function (world, context) {
    const browserName = await browser.capabilities.browserName;
    const allureReporter = require('@wdio/allure-reporter').default;
    allureReporter.addEnvironment('Browser', browserName);
    console.log(`▶ Starting scenario: ${world.pickle.name} on ${browserName}`);
  },

  afterStep: async function (step, scenario, result) {
    if (!result.passed) {
      console.error(` Step failed: ${step.text}`);
      console.error(` Error: ${JSON.stringify(result.error, null, 2)}`);
      await browser.takeScreenshot();
    }
  },

  afterScenario: async function (world, result, context) {
    if (!result.passed) {
      console.warn(`🚨 Scenario failed: ${world.pickle.name}`);
      await browser.takeScreenshot();
    }
  },

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
