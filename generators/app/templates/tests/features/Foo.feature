Feature: Foo

  Rule: Numbers should be added together

  Scenario: Simple Sum
    Given a parameter of 2 and a parameter of 3
    When I add the parameters together
    Then the sum should be 5

  Scenario Outline: Multiple Sum tests in one
    Given a parameter of <parameter1> and a parameter of <parameter2>
    When I add the parameters together
    Then the sum should be <sum>
    Examples:
      | parameter1 | parameter2 | sum  |
      | 1          | 2          | 3    |
      | 5          | 5          | 10   |
      | 18         | 22         | 40   |
      | 1002       | 19         | 1021 |
      | 1          | 1          | 2    |

  Scenario Outline: Multiple Difference tests in one
    Given a parameter of <parameter1> and a parameter of <parameter2>
    When I subtract the parameters from each other
    Then the difference should be <sum>
    Examples:
      | parameter1 | parameter2 | sum  |
      | 1          | 2          | -1   |
      | 5          | 5          | 0    |
      | 18         | 22         | -4   |
      | 1002       | 19         | 983  |
      | 1          | 1          | 0    |
