const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  method1() {
    this.log('method 1 of app just ran');
  }

  method2() {
    this.log('method 2 of app just ran');
  }
};
