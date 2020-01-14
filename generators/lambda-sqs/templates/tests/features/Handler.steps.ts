import { Given, When, Then } from 'cucumber';
import { expect } from 'chai';
import * as index from '../../src/index';
import { APIGatewayEvent } from 'aws-lambda';

let apiGatewayEvent: APIGatewayEvent;
let response: any;

Given('the following API Gateway Event:', async (docString: string) => {
  apiGatewayEvent = JSON.parse(docString);
});

When('calling the lambda function', async () => {
  response = await index.handler(apiGatewayEvent);
});

Then('expect the following response', async (docString: string) => {
  const expectedResponse = JSON.parse(docString);
  expect(response.statusCode).to.equal(expectedResponse.statusCode);
  expect(response.body).to.equal(expectedResponse.body);
});
