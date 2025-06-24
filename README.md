# WebdriverIO + Cucumber Test Automation

This project is a test automation framework using **WebdriverIO v9**, **Cucumber BDD**, and **Allure Reports**.  

🛠 Tools Used
 **WebdriverIO – Automation test framework
 **Cucumber.js – BDD syntax for feature filesAllure Report – **Beautiful test reports
 **Node.js & NPM – JavaScript runtime and package manager

Feature: Login Form Tests

  Scenario: UC-1: Test login form with empty credentials
    Given I am on the login page
    When I type credentials into "username" field
    And I type credentials into "password" field
    And I clear the "username" field
    And I clear the "password" field
    And I click on the login button
    Then I should see the error message "Epic sadface: Username is required"

  Scenario: UC-2: Test login with only username
    Given I am on the login page
    When I type credentials into "username" field
    And I clear the "password" field
    And I click on the login button
    Then I should see the error message "Epic sadface: Password is required"

  Scenario: UC-3: Test login with valid credentials
    Given I am on the login page
    When I login with valid credentials
    Then I should see the title "Swag Labs"
    And I should be redirected to the inventory page  

🚀 How to Run the Project
npm install
run NPM script (see below)

How to Generate Allure Report
🛠 Installation
Install Allure reporter and command-line tools:
npm install @wdio/allure-reporter --save-dev
npm install allure-commandline --save-dev
📂 Generate the Report
npx allure generate allure-results --clean -o allure-report
🌐 Open the Report
npx allure open allure-report
"clean:allure": "rd /s /q allure-results & rd /s /q allure-report"

 NPM Scripts (in package.json)
scripts to run test & report  
"wdio": "wdio run ./wdio.conf.js",
"scripts": {
"allure:report": "allure generate allure-results --clean -o allure-report && allure open allure-report"
}  
