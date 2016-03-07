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

var core = {
  init: function init(app) {
    var _this = this;

    return _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var

      //TODO: on nio init find path of hanger by hangar config file, not process
      np, env, has, is, includes, _ref, hangarPath, botPath, productPath, shelterPath, cargoPath, developer, createPath, processPath, nioHomePath, mode, nioFile, setPath, config, _config, convention, productRawPath, shelterRawPath, productFolders, productCollection, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, productFolder, currentProductPath, currentProduct;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
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

              createPath = function createPath() {
                return np.resolve(np.join.apply(np, arguments));
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
                //nioFile = lookup('*product.js', {cwd: nioHomePath})
                if (!is(nioFile, 'nothing') && !is(nioFile, 'zero-len')) {
                  mode = 'product';
                }
              }

              if (mode === 'hangar' && includes(nioHomePath, '/products')) {
                nioHomePath = np.resolve(np.join(nioHomePath, '../../'));
                mode = 'product';
              }

              env.set('NIO_FILE_PATH', nioFile);
              app.log('NIO_FILE_PATH -> ', nioFile);

              if (nioFile) {
                _context.next = 24;
                break;
              }

              throw 'Derp! No hangar.js or product.js file found.';

            case 24:
              setPath = function setPath(key, path) {
                var createdPath = path != '' ? createPath(nioHomePath, path) : '';
                env.set(key, createdPath);
                app.log('env set -> ' + key + ' ->', createdPath);

                return createdPath;
              };

              //:-> load environment lets

              env.set('NIO_HOME', nioHomePath);
              app.log('NIO_HOME -> ', nioHomePath);

              env.set('NIO_MODE', mode);
              app.log('NIO_MODE -> ', mode);

              hangarPath = setPath('HANGAR_PATH', '/');

              config = { convention: {
                  bots: 'bots',
                  cargo: 'cargo',
                  products: 'products',
                  shelter: 'shelter'
                } };


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

              productRawPath = mode === 'hangar' && includes(nioFile, 'hangar.js') ? '/' + (convention.products ? 'products' : convention.products) : '';


              if (mode === 'product') productRawPath = nioHomePath;

              productPath = setPath('PRODUCT_PATH', productRawPath);

              shelterRawPath = mode === 'hangar' ? '/' + (convention.shelter ? 'shelter' : convention.shelter) : '';


              setPath('SHELTER_PATH', shelterRawPath);

              setPath('CARGO_PATH', '/' + (convention.cargo ? 'cargo' : convention.cargo));

              developer = app.localStorage.getItem('developer');
              developer = is(developer, 'nothing') ? '' : developer;
              env.set('DEVELOPER', developer);
              app.log('env set -> DEVELOPER ->', developer);

              //:-> load products
              productFolders = [];

              app.log('loading hangar products...');

              productCollection = [];

              if (!(mode === 'hangar')) {
                _context.next = 85;
                break;
              }

              productFolders = _tools2.default.getFolders(createPath(productPath));

              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 54;
              _iterator = productFolders[Symbol.iterator]();

            case 56:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 71;
                break;
              }

              productFolder = _step.value;
              currentProductPath = createPath(productPath, productFolder);


              if (np.resolve(processPath) === productPath) {
                currentProductPath = processPath;
              }

              _context.next = 62;
              return _tools2.default.load(currentProductPath + '/product.js');

            case 62:
              _context.t0 = _context.sent;

              if (_context.t0) {
                _context.next = 65;
                break;
              }

              _context.t0 = {};

            case 65:
              currentProduct = _context.t0;


              if (has(currentProduct, 'default')) {
                currentProduct = currentProduct.default;
              }

              if (has(currentProduct, 'name')) {
                productCollection.push(_extends({
                  path: currentProductPath
                }, currentProduct));
              }

            case 68:
              _iteratorNormalCompletion = true;
              _context.next = 56;
              break;

            case 71:
              _context.next = 77;
              break;

            case 73:
              _context.prev = 73;
              _context.t1 = _context['catch'](54);
              _didIteratorError = true;
              _iteratorError = _context.t1;

            case 77:
              _context.prev = 77;
              _context.prev = 78;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 80:
              _context.prev = 80;

              if (!_didIteratorError) {
                _context.next = 83;
                break;
              }

              throw _iteratorError;

            case 83:
              return _context.finish(80);

            case 84:
              return _context.finish(77);

            case 85:
              return _context.abrupt('return', {
                developer:
                //-> collect boxes in shelter

                developer,
                mode: mode,
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

            case 86:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[54, 73, 77, 85], [78,, 80, 84]]);
    }))();
  },

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
      var _this2 = this;

      return _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var machines, running;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return core.shelter.status(options, cwd);

              case 2:
                machines = _context2.sent;
                running = false;

                Object.keys(machines).forEach(function (name) {
                  if (machines[name].status == 'running') {
                    running = true;
                  }
                });
                return _context2.abrupt('return', running);

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
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
      var _this3 = this;

      return _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        var version, installed;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                version = null;
                installed = false;
                _context3.prev = 2;
                _context3.next = 5;
                return core.shelter.version(options);

              case 5:
                version = _context3.sent;

                installed = version ? true : false;
                _context3.next = 12;
                break;

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3['catch'](2);

                installed = false;

              case 12:
                return _context3.abrupt('return', installed);

              case 13:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this3, [[2, 9]]);
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