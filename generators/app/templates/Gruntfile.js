'use strict';
// Created using <%= pkg.name %> <%= pkg.version %> on <%= (new Date).toISOString().split('T')[0] %>

function setEnv() {
  if (process.env.NODE_ENV) {
    return process.env.NODE_ENV;
  } else {
    return 'dev';
  }
}

module.exports = function (grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);
  grunt.task.loadTasks('./grunt');

  grunt.initConfig({
    destinations: {
      lambda: 'lambda'
    },

    env: setEnv(),



    lambda_invoke: {
      lambdaFunc: {
        options: {
          file_name: '<%%= destinations.lambda %>/lambdaFunc/index.js',
          'event': '<%%= destinations.lambda %>/lambdaFunc/event.json'
        }
      }
    },
    lambda_package: {
      lambdaFunc: {
        options: {
          package_folder: '<%%= destinations.lambda %>/lambdaFunc/',
          include_time: false,
          dist_folder: '<%%= destinations.lambda %>/dist'
        }
      }
    },
    lambda_deploy: {
      lambdaFunc: {
        arn: 'arn:aws:lambda:us-east-1:000000000000:function:lambdaFunc',
        options: {}
      }
    },

    watch: {
      options: {
        spawn: false
      },
      lambda: {
        files: ['<%%= destinations.lambda %>/**/*'],
        tasks: []
      }
    },

    clean: {
      lambdaDist: ['<%%= destinations.lambda %>/dist']
    }

  });

  grunt.registerTask('lambdaDeploy', function(target) {
    grunt.task.run([
      'lambda_package' + (target ? ':' + target : ''),
      'lambda_deploy' + (target ? ':' + target : '')
    ]);
  });

  grunt.registerTask('default', [
    'lambdaDeploy'
  ]);

};
