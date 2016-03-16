'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _spawnShell = require('spawn-shell');

var _spawnShell2 = _interopRequireDefault(_spawnShell);

var _fsExtraPromiseEs = require('fs-extra-promise-es6');

var fse = _interopRequireWildcard(_fsExtraPromiseEs);

var _pm = require('pm2');

var _pm2 = _interopRequireDefault(_pm);

var _nodeSsh = require('node-ssh');

var _nodeSsh2 = _interopRequireDefault(_nodeSsh);

var _nodeGlobLoader = require('node-glob-loader');

var _nodeGlobLoader2 = _interopRequireDefault(_nodeGlobLoader);

var _processEnv = require('process-env');

var _processEnv2 = _interopRequireDefault(_processEnv);

var _folderContents = require('folder-contents');

var _folderContents2 = _interopRequireDefault(_folderContents);

var _nioTools = require('nio-tools');

var _nioTools2 = _interopRequireDefault(_nioTools);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var runShell = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(command) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _spawnShell2.default)(command, options).exitPromise;

          case 2:
            return _context.abrupt('return', _context.sent);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function runShell(_x, _x2) {
    return ref.apply(this, arguments);
  };
}();

var load = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(glob) {
    var run;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            run = function run() {
              return new Promise(function (resolve, reject) {
                var requires = null;
                _nodeGlobLoader2.default.load(glob, function (exports) {
                  requires = exports;
                }).then(function () {
                  resolve(requires);
                }, function (e) {
                  reject(e);
                });
              });
            };

            _context2.next = 3;
            return run();

          case 3:
            return _context2.abrupt('return', _context2.sent);

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function load(_x4) {
    return ref.apply(this, arguments);
  };
}();

var getFolders = function getFolders(path) {
  var options = {
    path: path
  };
  var result = (0, _folderContents2.default)(options);
  var folders = [];
  if (_nioTools2.default.has(result, '.folders')) folders = result['.folders'];
  return folders;
};

exports.default = {
  np: _path2.default,
  spawnShell: _spawnShell2.default,
  runShell: runShell,
  fse: fse,
  pm2: _pm2.default,
  SSH: _nodeSsh2.default,
  loader: _nodeGlobLoader2.default,
  env: _processEnv2.default,
  load: load,
  getFolders: getFolders,
  _: _nioTools2.default
};
module.exports = exports['default'];