import { APIGatewayEvent } from './models/AWS';
import Foo from './Foo';

export const handler = async (event: APIGatewayEvent): Promise<any> => {
  if (event.queryStringParameters === null) {
    return {
      statusCode: 422,
      body: 'Query parameters required: ?v1=<number>&v2=<number>&operator=[sum|difference]'
    };
  }
  const foo = new Foo();
  const value1 = parseInt(event.queryStringParameters['v1'], 10);
  const value2 = parseInt(event.queryStringParameters['v2'], 10);
  const operator = event.queryStringParameters['operator'];
  if (operator === 'sum') {
    return {
      statusCode: 200,
      body: `Sum of v1 and v2 is ${foo.sum(value1, value2)}`
    };
  }
  if (operator === 'difference') {
    return {
      statusCode: 200,
      body: `Difference of v1 and v2 is ${foo.difference(value1, value2)}`
    };
  }
  return {
    statusCode: 422,
    body: `Operator must be "sum" or "difference" but found "${operator}"`
  };
};
