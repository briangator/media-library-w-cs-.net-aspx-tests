Feature: Media Library Management
  Written by Brian McCarthy
  As a library administrator
  I want to manage media items polymorphicly
  So that I can generate value reports and track inventory

  Scenario: Adding a book and verifying its properties
    Given the media library is empty
    When I add a "Book" titled "C# Mastery" with 500 pages from 2024
    Then the library should contain 1 item
    And the item's estimated value should reflect its page count bonus

  Scenario: Searching for a movie
    Given the library contains "The Matrix" and "Inception"
    When I search for "Matrix"
    Then I should see 1 result
    And the result should show as a "Film" category

  Scenario: Generating a library value report
    Given the library has items with a total value of 100.00
    When I request a detailed report
    Then the terminal output should show "Total Library Value: $100.00"

  Scenario: Verifying review score encapsulation
    When I attempt to set a review score to 15
    Then the system should cap the score to 5.0

  Scenario: Checking unique items in Top 5
    Given multiple copies of "The Matrix" exist in the catalog
    When the Top 5 list is generated
    Then "The Matrix" should only appear once in the rankings
