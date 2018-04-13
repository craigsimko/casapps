const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.appConfig = {};
  }

  prompting() {
    return this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.appname // Default to current folder name
    }, {
      type: 'input',
      name: 'description',
      message: 'Describe your project',
      default: ''
    }]).then((answers) => {
      this.appConfig.appname = answers.name;
      this.appConfig.description = answers.description;
    });
  }

  writing() {
    var context = this.appConfig;

    this.fs.copy(this.sourceRoot() + '/.vscode', context.appname + '/.vscode');
    this.fs.copy(this.sourceRoot() + '/test', context.appname + '/test');
    this.fs.copy(this.sourceRoot() + '/.gitignore', context.appname + '/.gitignore');
    this.fs.copy(this.sourceRoot() + '/stryker.conf.js', context.appname + '/stryker.conf.js');
    this.fs.copy(this.sourceRoot() + '/tsconfig.json', context.appname + '/tsconfig.json');
    this.fs.copy(this.sourceRoot() + '/tslint.json', context.appname + '/tslint.json');

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath(context.appname + '/README.md'),
      context
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath(context.appname + '/package.json'),
      context
    );

    this.fs.copy(this.sourceRoot() + '/src/index.ts', context.appname + '/src/index.ts', context);

    this.appConfig.installDependencies = true;
  }
};
