import { expect } from 'chai';
import Foo from '../../src/Foo';

describe('Foo', () => {
  describe('sum 2 and 3', () => {
    it('should return 5', () => {
      const foo = new Foo();
      expect(foo.sum(2, 3)).to.equal(5, '2 + 3 should be 5');
    });
  });
  describe('sum 0 and 0', () => {
    it('should return 0', () => {
      const foo = new Foo();
      expect(foo.sum(0, 0)).to.equal(0, '0 + 0 should be 0');
    });
  });
});
