import { Given, When, Then, Before } from 'cucumber';
import { expect } from 'chai';
import Foo from '../../src/Foo';

const foo = new Foo();
let xGlobal: number;
let yGlobal: number;
let sumGlobal: number;
let differenceGlobal: number;

Before(() => {
  xGlobal = 0;
  yGlobal = 0;
  sumGlobal = 0;
  differenceGlobal = 0;
});

Given('a parameter of {int} and a parameter of {int}', (x: number, y: number) => {
  xGlobal = x;
  yGlobal = y;
});

When('I add the parameters together', () => {
  sumGlobal = foo.sum(xGlobal, yGlobal);
});

When('I subtract the parameters from each other', () => {
  differenceGlobal = foo.difference(xGlobal, yGlobal);
});

Then('the sum should be {int}', (sum: number) => {
  return expect(sum).to.equal(sumGlobal, `Adding ${xGlobal} and ${yGlobal} should equal ${sumGlobal}`);
});

Then('the difference should be {int}', (difference: number) => {
  return expect(difference).to.equal(differenceGlobal, `The difference produced by ${xGlobal} - ${yGlobal} should be ${differenceGlobal}`);
});
