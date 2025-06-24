Feature: Login Form Tests

  Scenario: UC-1: Test login form with empty credentials
    Given I am on the login page
    When I type credentials into "username" field
    And I type credentials into "password" field
    And I clear the "username" field
    And I clear the "password" field
    And I click on the login button
    Then I should see the error message "Epic sadface: Username is required"

  Scenario: UC-2: Test login form with credentials by passing Username
    Given I am on the login page
    When I type credentials into "username" field
    And I type credentials into "password" field
    And I clear the "password" field
    And I click on the login button
    Then I should see the error message "Epic sadface: Password is required"

  Scenario: UC-3: Test login form with credentials by passing Username & Password
    Given I am on the login page
    When I login with valid credentials
    Then I should see the title "Swag Labs"
    And I should be redirected to the inventory page
