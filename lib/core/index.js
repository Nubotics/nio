'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _tools = require('../tools');

var _tools2 = _interopRequireDefault(_tools);

var _nioTools = require('nio-tools');

var _nioTools2 = _interopRequireDefault(_nioTools);

var _lookUp = require('look-up');

var _lookUp2 = _interopRequireDefault(_lookUp);

var _npmlog = require('npmlog');

var _npmlog2 = _interopRequireDefault(_npmlog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var spawn = require('child_process').spawn;

var createPath = function createPath() {
  var np = _tools2.default.np;

  return np.resolve(np.join.apply(np, arguments));
};
var products = {
  init: function init(mode, processPath, productPath) {
    var _this = this;

    return _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var np, has, productFolders, productCollection, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, productFolder, currentProductPath, currentProduct, _currentProductPath, _currentProduct;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              np = _tools2.default.np;
              has = _nioTools2.default.has;
              productFolders = [];
              productCollection = [];

              if (!(mode === 'hangar')) {
                _context.next = 42;
                break;
              }

              productFolders = _tools2.default.getFolders(createPath(productPath));

              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 9;
              _iterator = productFolders[Symbol.iterator]();

            case 11:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 26;
                break;
              }

              productFolder = _step.value;
              currentProductPath = createPath(productPath, productFolder);


              if (np.resolve(processPath) === productPath) {
                currentProductPath = processPath;
              }

              _context.next = 17;
              return _tools2.default.load(currentProductPath + '/product.js');

            case 17:
              _context.t0 = _context.sent;

              if (_context.t0) {
                _context.next = 20;
                break;
              }

              _context.t0 = {};

            case 20:
              currentProduct = _context.t0;


              if (has(currentProduct, 'default')) {
                currentProduct = currentProduct.default;
              }

              if (has(currentProduct, 'name')) {
                productCollection.push(_extends({
                  path: currentProductPath
                }, currentProduct));
              }

            case 23:
              _iteratorNormalCompletion = true;
              _context.next = 11;
              break;

            case 26:
              _context.next = 32;
              break;

            case 28:
              _context.prev = 28;
              _context.t1 = _context['catch'](9);
              _didIteratorError = true;
              _iteratorError = _context.t1;

            case 32:
              _context.prev = 32;
              _context.prev = 33;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 35:
              _context.prev = 35;

              if (!_didIteratorError) {
                _context.next = 38;
                break;
              }

              throw _iteratorError;

            case 38:
              return _context.finish(35);

            case 39:
              return _context.finish(32);

            case 40:
              _context.next = 51;
              break;

            case 42:
              _currentProductPath = createPath(productPath);
              _context.next = 45;
              return _tools2.default.load(_currentProductPath + '/product.js');

            case 45:
              _context.t2 = _context.sent;

              if (_context.t2) {
                _context.next = 48;
                break;
              }

              _context.t2 = {};

            case 48:
              _currentProduct = _context.t2;


              if (has(_currentProduct, 'default')) {
                _currentProduct = _currentProduct.default;
              }

              if (has(_currentProduct, 'name')) {
                productCollection.push(_extends({
                  path: _currentProductPath
                }, _currentProduct));
              }

            case 51:
              return _context.abrupt('return', productCollection);

            case 52:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[9, 28, 32, 40], [33,, 35, 39]]);
    }))();
  }
};

var core = {
  init: function init(app) {
    var _this2 = this;

    return _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
      var

      //TODO: on nio init find path of hanger by hangar config file, not process
      np, env, has, is, includes, _ref, hangarPath, botPath, productPath, shelterPath, cargoPath, developer, setEnv, processPath, nioHomePath, mode, nioFile, setPath, config, _config, convention, productRawPath, shelterRawPath, productCollection;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:

              app.log('loading hangar environment...');np = _tools2.default.np;
              env = _tools2.default.env;
              has = _nioTools2.default.has;
              is = _nioTools2.default.is;
              includes = _nioTools2.default.includes;
              _ref = '';
              hangarPath = _ref.hangarPath;
              botPath = _ref.botPath;
              productPath = _ref.productPath;
              shelterPath = _ref.shelterPath;
              cargoPath = _ref.cargoPath;
              developer = _ref.developer;

              setEnv = function setEnv(key, val) {

                if (is(env.get(key), 'nothing')) {
                  env.set(key, val);
                }
              };

              //:-> run path


              processPath = process.cwd();

              //:-> nio home path

              nioHomePath = processPath;

              //:-> nio mode

              mode = 'hangar';

              //:-> detect mode -> hangar / product

              nioFile = (0, _lookUp2.default)('*hangar.js', { cwd: nioHomePath });


              if (is(nioFile, 'nothing') || is(nioFile, 'zero-len')) {
                mode = 'product';
              }

              if (mode === 'hangar' && includes(nioHomePath, '/products')) {
                nioHomePath = np.resolve(np.join(nioHomePath, '../../'));
                mode = 'product';
              }

              setEnv('NIO_FILE_PATH', nioFile);
              app.log('NIO_FILE_PATH -> ', nioFile);

              if (!(!nioFile && mode === 'hangar')) {
                _context2.next = 24;
                break;
              }

              throw 'Derp! No hangar.js file found.';

            case 24:
              setPath = function setPath(key, path) {
                var createdPath = path != '' ? createPath(nioHomePath, path) : '';
                setEnv(key, createdPath);
                app.log('env set -> ' + key + ' ->', createdPath);

                return createdPath;
              };

              //:-> load environment lets

              setEnv('NIO_HOME', nioHomePath);
              app.log('NIO_HOME -> ', nioHomePath);

              setEnv('NIO_MODE', mode);
              app.log('NIO_MODE -> ', mode);

              hangarPath = setPath('HANGAR_PATH', '/');

              config = {
                convention: {
                  bots: 'bots',
                  cargo: 'cargo',
                  products: 'products',
                  shelter: 'shelter'
                }
              };


              if (mode === 'hangar') {
                config = require(nioFile);
              }

              _config = config;
              convention = _config.convention;


              if (is(convention, 'nothing')) {
                convention = {
                  bots: 'bots',
                  cargo: 'cargo',
                  products: 'products',
                  shelter: 'shelter'
                };
              }

              setPath('BOT_PATH', '/' + (convention.bots ? 'bots' : convention.bots));

              productRawPath = mode === 'hangar' ? '/' + (convention.products ? 'products' : convention.products) : '/';

              if (mode === 'product') {
                productRawPath = processPath;
              }
              productPath = productRawPath != processPath ? createPath(nioHomePath, productRawPath) : productRawPath;
              setEnv('PRODUCT_PATH', productPath);
              app.log('env set -> PRODUCT_PATH ->', productPath);

              shelterRawPath = mode === 'hangar' ? '/' + (convention.shelter ? 'shelter' : convention.shelter) : '';

              setPath('SHELTER_PATH', shelterRawPath);

              setPath('CARGO_PATH', '/' + (convention.cargo ? 'cargo' : convention.cargo));

              developer = app.localStorage.getItem('developer');
              developer = is(developer, 'nothing') ? '' : developer;
              setEnv('DEVELOPER', developer);
              app.log('env set -> DEVELOPER ->', developer);

              //:-> load products

              productCollection = [];

              if (!(developer != '')) {
                _context2.next = 53;
                break;
              }

              _context2.next = 52;
              return products.init(mode, processPath, productPath);

            case 52:
              productCollection = _context2.sent;

            case 53:
              return _context2.abrupt('return', {
                developer:

                //-> collect boxes in shelter

                developer,
                mode: mode,
                processPath: processPath,
                paths: {
                  home: env.get('NIO_HOME'),
                  hangar: env.get('HANGAR_PATH'),
                  products: env.get('PRODUCT_PATH'),
                  bots: env.get('BOT_PATH'),
                  shelter: env.get('SHELTER_PATH'),
                  cargo: env.get('CARGO_PATH')
                },
                productCollection: productCollection
              });

            case 54:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    }))();
  },

  products: products,
  bots: {
    start: function start(config) {
      var pm2 = _tools2.default.pm2;

      return new Promise(function (resolve, reject) {
        pm2.connect(function (err) {
          if (err) {
            reject(err);
          } else {
            pm2.start(config, function (err, proc) {
              if (err) {
                reject(err);
              } else {
                pm2.disconnect();
                resolve(proc);
              }
            });
          }
        });
      });
    },
    restart: function restart(procNameOrId) {
      var pm2 = _tools2.default.pm2;

      return new Promise(function (resolve, reject) {
        pm2.connect(function (err) {
          if (err) {
            reject(err);
          } else {
            pm2.restart(procNameOrId, function (err, proc) {
              if (err) {
                reject(err);
              } else {
                pm2.disconnect();
                resolve(proc);
              }
            });
          }
        });
      });
    },
    stop: function stop(procNameOrId) {
      var pm2 = _tools2.default.pm2;

      return new Promise(function (resolve, reject) {
        pm2.connect(function (err) {
          if (err) {
            reject(err);
          } else {
            pm2.stop(procNameOrId, function (err, proc) {
              if (err) {
                reject(err);
              } else {
                pm2.disconnect();
                resolve(proc);
              }
            });
          }
        });
      });
    },
    status: function status(procNameOrId) {
      var pm2 = _tools2.default.pm2;

      return new Promise(function (resolve, reject) {
        pm2.connect(function (err) {
          if (err) {
            reject(err);
          } else {
            pm2.describe(procNameOrId, function (err, list) {
              if (err) {
                reject(err);
              } else {
                pm2.disconnect();
                resolve(list);
              }
            });
          }
        });
      });
    },
    list: function list() {
      var pm2 = _tools2.default.pm2;

      return new Promise(function (resolve, reject) {
        pm2.connect(function (err) {
          if (err) {
            reject(err);
          } else {
            pm2.list(function (err, list) {
              if (err) {
                reject(err);
              } else {
                pm2.disconnect();
                resolve(list);
              }
            });
          }
        });
      });
    },
    kill: function kill(procNameOrId) {
      var pm2 = _tools2.default.pm2;

      return new Promise(function (resolve, reject) {
        pm2.connect(function (err) {
          if (err) {
            reject(err);
          } else {
            pm2.describe(procNameOrId, function (err, proc) {
              if (err) {
                reject(err);
              } else {
                pm2.disconnect();
                resolve(proc);
              }
            });
          }
        });
      });
    }
  },
  shelter: {
    spawnVagrant: function spawnVagrant(binary, args, options) {

      //log.info('Vagrant spawn -> args, options', args, options)

      var vagrant = spawn(binary, args, options);
      _npmlog2.default.verbose('vagrant', 'vagrant ' + args.join(' '));
      var stdout = '';
      var stderr = '';
      vagrant.stdout.on('data', function (data) {
        data = _nioTools2.default.trim(data + '');
        if (data) _npmlog2.default.silly('vagrant', '%s', data);
        stdout += '' + data;
      });
      vagrant.stderr.on('data', function (data) {
        data = _nioTools2.default.trim(data + '');
        if (data) _npmlog2.default.error('vagrant', '%s', data);
        stderr += '' + data;
      });
      vagrant.on('close', function (code) {
        if (code) _npmlog2.default.error('vagrant', 'close code %s', code);
        vagrant.emit('done', code, stdout, stderr);
      });
      return vagrant;
    },
    up: function up(options, machine, cwd) {
      var provision = options.provision || false;
      var provider = options.provider || 'virtualbox';
      var binary = options.binary || 'vagrant';
      return new Promise(function (resolve, reject) {
        var vagrant = core.shelter.spawnVagrant(binary, ['up', machine, provider ? '--provider=' + provider : '', !provision ? '--no-provision' : '--provision=' + provision], { cwd: cwd });
        var booted = null;
        vagrant.stdout.on('data', function (data) {
          data += '';
          if (data.match(/Machine booted and ready!/)) {
            booted = true;
          }
          if (data.match(/is already running.$/)) {
            booted = false;
          }
        });
        vagrant.on('done', function (code, stdout, stderr) {
          if (stderr) {
            reject(stderr);
          } else {
            resolve(booted);
          }
        });
      });
    },
    halt: function halt(options, cwd) {
      var binary = options.binary || 'vagrant';
      return new Promise(function (resolve, reject) {
        var vagrant = core.shelter.spawnVagrant(binary, ['halt'], { cwd: cwd });
        vagrant.on('done', function (code, stdout, stderr) {
          if (stderr) {
            reject(stderr);
          } else {
            resolve(true);
          }
        });
      });
    },
    status: function status(options, cwd) {
      var machines = {};
      var reg = /([a-z0-9-_]+)\s+(running|poweroff|aborted|not created)\s+[(](virtualbox|libvirt)[)]/i;
      var binary = options.binary || 'vagrant';
      return new Promise(function (resolve, reject) {
        var vagrant = core.shelter.spawnVagrant(binary, ['status'], { cwd: cwd });
        vagrant.stdout.on('data', function (data) {
          data += '';
          data.split('\n').forEach(function (line) {
            var regRes = line.match(reg);
            if (regRes) {
              var name = regRes[1];
              machines[name] = {
                status: regRes[2],
                provider: regRes[3]
              };
            }
          });
        });
        vagrant.on('done', function (code, stdout, stderr) {
          if (stderr) {
            reject(stderr);
          } else {
            resolve(machines);
          }
        });
      });
    },
    isRunning: function isRunning(options, cwd) {
      var _this3 = this;

      return _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        var machines, running;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return core.shelter.status(options, cwd);

              case 2:
                machines = _context3.sent;
                running = false;

                Object.keys(machines).forEach(function (name) {
                  if (machines[name].status == 'running') {
                    running = true;
                  }
                });
                return _context3.abrupt('return', running);

              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this3);
      }))();
    },
    version: function version(options) {
      var binary = options.binary || 'vagrant';
      return new Promise(function (resolve, reject) {
        var vagrant = spawnVagrant(binary, ['-v']);
        var version = '';
        vagrant.stdout.on('data', function (data) {
          version = (data + '').match(/Vagrant\s+([0-9.]+)/)[1];
          if (version) version = version[1];
        });
        vagrant.on('done', function (code, stdout, stderr) {
          if (stderr) {
            reject(stderr);
          } else {
            resolve(version);
          }
        });
      });
    },
    isInstalled: function isInstalled(options) {
      var _this4 = this;

      return _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        var version, installed;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                version = null;
                installed = false;
                _context4.prev = 2;
                _context4.next = 5;
                return core.shelter.version(options);

              case 5:
                version = _context4.sent;

                installed = version ? true : false;
                _context4.next = 12;
                break;

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4['catch'](2);

                installed = false;

              case 12:
                return _context4.abrupt('return', installed);

              case 13:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this4, [[2, 9]]);
      }))();
    },
    addBox: function addBox() {}
  },
  cargo: {},
  developer: {},
  git: {},
  bitBucket: {},
  gitHub: {},
  npm: {},
  plugins: {}
};

exports.default = core;
module.exports = exports['default'];