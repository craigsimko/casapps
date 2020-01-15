import { expect } from 'chai';
import * as index from '../../src/index';
import { APIGatewayEvent } from '../../src/models/AWS';

describe('Handler', () => {
  describe('Given v1 of 2, v2 of 3, and operator of "sum"', () => {
    it('Should return status code 200 and body of "Sum of v1 and v2 is 5"', async () => {
      const expectedStatusCode = 200;
      const expectedBody = 'Sum of v1 and v2 is 5';

      const response = await index.handler({
        queryStringParameters: {
          v1: '2',
          v2: '3',
          operator: 'sum'
        }
      } as unknown as  APIGatewayEvent);

      expect(response.statusCode).to.equal(expectedStatusCode);
      expect(response.body).to.equal(expectedBody);
    });
  });
});
