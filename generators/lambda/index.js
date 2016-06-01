'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var pkg = require('../../package.json');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'OK, let\'s make a new AWS Lambda function.'
    ));

    var prompts = [
      {
        type    : 'input',
        name    : 'name',
        message : 'What do you want to call this function (no spaces or special characters)?',
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
      this.templatePath('lambdaFunc'),
      this.destinationPath('lambda/' + this.props.name),
      this.props
    );

    // lambda_invoke: {
    //   lambdaFunc: {
    //     options: {
    //       file_name: '<%%= destinations.lambda %>/lambdaFunc/index.js',
    //       'event': '<%%= destinations.lambda %>/lambdaFunc/event.json'
    //     }
    //   }
    // },
    // lambda_package: {
    //   lambdaFunc: {
    //     options: {
    //       package_folder: '<%%= destinations.lambda %>/lambdaFunc/',
    //       include_time: false,
    //       dist_folder: '<%%= destinations.lambda %>/dist'
    //     }
    //   }
    // },
    // lambda_deploy: {
    //   lambdaFunc: {
    //     arn: 'arn:aws:lambda:us-east-1:000000000000:function:lambdaFunc',
    //     options: {}
    //   }
    // },

    console.dir(this.gruntfile.gruntfile.body);
    this.gruntfile.insertConfig('lambda_invoke', '{ foo: "bar" }')
  },

  install: function () {
    this.npmInstall();
    this.config.save()
  },

});
