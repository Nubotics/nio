require('babel-register');
require('babel-polyfill');
var nio = require('./src/index');
try {
  nio();
} catch (e) {
  console.log('nio derped', e);
}
