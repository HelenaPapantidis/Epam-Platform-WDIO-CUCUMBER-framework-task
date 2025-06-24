# WebdriverIO + Cucumber Test Automation

This project is a test automation framework using **WebdriverIO v9**, **Cucumber BDD**, and **Allure Reports**.

---

## 🛠 Tools Used

- **WebdriverIO** – Automation test framework  
- **Cucumber.js** – BDD syntax for feature files  
- **Allure Report** – Test reports  
- **Node.js & NPM** – JavaScript runtime and package manager  

---

## 🧪 Feature: Login Form Tests

```gherkin
Scenario: UC-1 – Test login form with empty credentials
  Given I am on the login page
  When I type credentials into "username" field
  And I type credentials into "password" field
  And I clear the "username" field
  And I clear the "password" field
  And I click on the login button
  Then I should see the error message "Epic sadface: Username is required"

Scenario: UC-2 – Test login with only username
  Given I am on the login page
  When I type credentials into "username" field
  And I clear the "password" field
  And I click on the login button
  Then I should see the error message "Epic sadface: Password is required"

Scenario: UC-3 – Test login with valid credentials
  Given I am on the login page
  When I login with valid credentials
  Then I should see the title "Swag Labs"
  And I should be redirected to the inventory page
```


 🚀 How to Run the Project

npm install  
npm run wdio



📊 How to Generate Allure Report

1. **Install Allure Reporter and CLI**  
   Run the following commands:

   npm install @wdio/allure-reporter --save-dev  
   npm install allure-commandline --save-dev

2. **Generate the Report**  
   This command will generate the `allure-report` folder:

   npx allure generate allure-results --clean -o allure-report

3. **Open the Report**  
   This will open the generated report in your browser:

   npx allure open allure-report



## 📂 Useful NPM Scripts (`package.json`)

"scripts": {  
  "test": "wdio run ./wdio.conf.js",  
  "allure:report": "allure generate allure-results --clean -o allure-report && allure open allure-report",  
  "clean:allure": "rd /s /q allure-results & rd /s /q allure-report"  
}  

