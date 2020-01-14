Feature: Handler

  Scenario: Values should be added together when operator is sum
    Given the following API Gateway Event:
      """
      {
        queryStringParameters: {
          v1: 1,
          v2: 3,
          operator: "sum"
        }
      }
      """
    When calling the lambda function
    Then expect the following response
      """
      {
        statusCode: 200,
        body: "Sum of v1 and v2 is 4"
      }
      """