// Inject node globals into React Native global scope.
// see: https://gist.github.com/dougbacelar/29e60920d8fa1982535247563eb63766

global.Buffer = require('buffer').Buffer;
global.process = require('process');

if (typeof btoa === 'undefined') {
  global.btoa = function(str) {
    return new Buffer(str, 'binary').toString('base64');
  };
}

if (typeof atob === 'undefined') {
  global.atob = function(b64Encoded) {
    return new Buffer(b64Encoded, 'base64').toString('binary');
  };
}
