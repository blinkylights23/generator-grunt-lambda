'use strict';

var exampleTask = function(grunt) {
  grunt.registerTask('exampleTask', 'Do something interesting', function() {
    grunt.log.writeln(['Do something interesting'])
  });
};

module.exports = exampleTask;
