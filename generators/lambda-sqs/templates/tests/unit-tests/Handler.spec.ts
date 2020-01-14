import { expect } from 'chai';
import * as index from '../../src/index';
import { SQSEvent } from 'aws-lambda';

describe('Handler', () => {
  describe('Given v1 of 2, v2 of 3, and operator of "sum"', () => {
    it('Should return message of "Sum of v1 and v2 is 5"', async () => {
      const expectedReturnMessage = 'Sum of v1 and v2 is 5';

      const response = await index.handler({
        Records: [{
          body: `{
            "v1": 2,
            "v2": 3,
            "operator": "sum"
          }`
        }]
      } as SQSEvent);

      expect(response.message).to.equal(expectedReturnMessage);
    });
  });
});
