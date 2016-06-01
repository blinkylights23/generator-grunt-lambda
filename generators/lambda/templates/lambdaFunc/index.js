'use strict';

var AWS = require('aws-sdk');

// Because Lambda
require('./lambdaPolyfills');

exports.handler = function (event, context) {
  // context.fail(err, err.stack);
  context.succeed("ok");
};
