#!/usr/bin/env node
require('babel-register');
require('babel-polyfill');
var nio = require('../lib/index');
try {
  nio();
} catch (e) {
  console.log('nio derped', e);
}
