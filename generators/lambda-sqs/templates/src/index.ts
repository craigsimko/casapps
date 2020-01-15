import { SQSEvent } from './models/AWS';
import Foo from './Foo';

export const handler = async (event: SQSEvent): Promise<any> => {
  const message = JSON.parse(event.Records[0].body);
  const foo = new Foo();
  const value1 = parseInt(message.v1, 10);
  const value2 = parseInt(message.v2, 10);
  const operator = message.operator;
  if (operator === 'sum') {
    console.log(`Sum of v1 and v2 is ${foo.sum(value1, value2)}`);
    return {
      message: `Sum of v1 and v2 is ${foo.sum(value1, value2)}`
    };
  }
  if (operator === 'difference') {
    console.log(`Difference of v1 and v2 is ${foo.difference(value1, value2)}`);
    return {
      message: `Difference of v1 and v2 is ${foo.difference(value1, value2)}`
    };
  }
  console.log(`Operator must be "sum" or "difference" but found "${operator}"`);
  return {
    message: `Operator must be "sum" or "difference" but found "${operator}"`
  };
};
