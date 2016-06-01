'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var pkg = require('../../package.json');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the AWS Lambda generator.'
    ));

    var prompts = [
      {
        type    : 'input',
        name    : 'name',
        message : 'What do you want to call this project?',
        default : this.appname
      },
      {
        type    : 'input',
        name    : 'version',
        message : 'Version?',
        default : '0.0.1'
      },
      {
        type    : 'input',
        name    : 'description',
        message : 'Description?',
        default : this.appname
      },
      {
        type    : 'input',
        name    : 'author',
        message : 'Author?'
      }
    ];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));

  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.props
    );
    this.fs.copy(
      this.templatePath('grunt'),
      this.destinationPath('grunt')
    );
    this.fs.copy(
      this.templatePath('test'),
      this.destinationPath('test')
    );
    this.fs.copyTpl(
      this.templatePath('lambda'),
      this.destinationPath('lambda'),
      {
        name: 'Example',
        version: '0.0.0',
        description: 'Example',
        author: 'Example'
      }
    );
    this.fs.copyTpl(
      this.templatePath('Gruntfile.js'),
      this.destinationPath('Gruntfile.js'),
      {
        pkg: pkg
      }
    );
  },

  install: function () {
    this.npmInstall();
    this.config.save()
  },

});
