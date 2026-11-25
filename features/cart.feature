
Feature: Shopping cart
  As a shopper
  I want to add tools to my cart and review them
  So that I can check what I am about to buy

  Background:
    Given I am on the Toolshop home page

  Scenario: Add a product to an empty cart
    Given my cart is empty
    When I open the product "Combination Pliers"
    And I add it to the cart
    Then I should see a message confirming the product was added
    And the cart icon should show 1 item

  Scenario: Review the cart contents
    Given I have added "Combination Pliers" to my cart
    When I open my cart
    Then I should see "Combination Pliers" listed
    And I should see its price and quantity
    And the cart total should match the price of the product

  Scenario: Remove a product from the cart
    Given I have added "Combination Pliers" to my cart
    And I am viewing my cart
    When I remove "Combination Pliers"
    Then the cart should be empty