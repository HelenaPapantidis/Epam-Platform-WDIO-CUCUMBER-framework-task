# 1. **Use Clear, Business-Oriented Language**
# Focus on user goals and outcomes, not just technical steps.
# Describe the value or reason behind each scenario.

# 2. **Add Acceptance Criteria for Success and Failure**
# Specify what success looks like from a business perspective.
# Include negative scenarios that matter to the business (e.g., security, compliance).

# 3. **Describe User Roles and Intent**
# State who is performing the action (e.g., "As a registered user...").
# Clarify the intent behind each action.

Feature: Login Form Tests

  As a user of the platform
  I want to securely login
  So that I can access my personal dashboard and data

  @UC-1
  Scenario: Test login form with empty credentials
    Given I am on the login page
    When I type credentials into "username" field
    And I type credentials into "password" field
    And I clear the "username" field
    And I clear the "password" field
    And I click on the login button
    Then I should see the error message "Epic sadface: Username is required"

  @UC-2
  Scenario: Test login form with credentials by passing Username
    Given I am on the login page
    When I type credentials into "username" field
    And I type credentials into "password" field
    And I clear the "password" field
    And I click on the login button
    Then I should see the error message "Epic sadface: Password is required"

  @UC-3
  Scenario: Test login form with credentials by passing Username & Password
    Given I am on the login page
    When I login with valid credentials
    Then I should be on the "inventory" page with the title "Swag Labs"
