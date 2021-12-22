'use strict';
const Generator = require('yeoman-generator');
const _s = require('underscore.string');
const utils = require('../utils');

module.exports = class extends Generator {
  constructor(a, b) {
    super(a, b);

    this.option('open', {
      type: Boolean,
      desc: 'Open the repository in VSCode',
      alias: 'o',
      required: false,
      store: true,
      default: true
    });
  }

  async init() {
    const props = await this.prompt([{
      name: 'moduleName',
      message: 'What do you want to name your module?',
      default: _s.slugify(this.appname),
      filter: x => utils.slugifyPackageName(x)
    }, {
      name: 'moduleDescription',
      message: 'What is your module description?',
      default: `An NPM Module`
    }]);

    const or = (option, prop) => this.options[option] === undefined ? props[prop || option] : this.options[option];

    const tpl = {
      moduleName: props.moduleName,
      moduleDescription: props.moduleDescription,
      name: this.user.git.name(),
      email: this.user.git.email()
    };

    const mv = (from, to) => {
      this.fs.move(this.destinationPath(from), this.destinationPath(to));
    };

    this.fs.copyTpl([
      `${this.templatePath()}/**`
    ], this.destinationPath(), tpl);

    mv('gitignore', '.gitignore');
    mv('_env.example', '.env.example');
    mv('_env', '.env');
    mv('_package.json', 'package.json');
    mv('_vscode/**', '.vscode/');
    mv('_eslintrc.js', '.eslintrc.js');

    if (or('open')) {
      this._openVsCode();
    }
  }

  git() {
    this.spawnCommandSync('git', ['init']);
  }

  install() {
    this.installDependencies({bower: false});
  }

  _openVsCode() {
    this.spawnCommandSync('code', [this.destinationPath()]);
  }
};
