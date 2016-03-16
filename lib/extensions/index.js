'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app, tools) {
  return function (ctx, opts) {
    ctx.api = ctx.api || {};

    var chalk = ctx.chalk;
    var lodash = ctx.lodash;
    var ui = ctx.ui;
    var _tools$_ = tools._;
    var has = _tools$_.has;
    var is = _tools$_.is;
    var inquirer = ui.inquirer;


    var setDeveloper = function setDeveloper(developer) {
      app.localStorage.setItem('developer', developer);
    };

    var getDeveloper = function getDeveloper() {
      return app.localStorage.getItem('developer') || 'nobody';
    };

    var init = function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return app.init(app, tools);

              case 2:
                return _context.abrupt('return', _context.sent);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function init() {
        return ref.apply(this, arguments);
      };
    }();

    ctx.command('hello [name]', 'greets nio and sets current developer').action(function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(args, cb) {
        var _this = this;

        var name, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, product, commands;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!has(args, 'name')) {
                  _context3.next = 43;
                  break;
                }

                name = args.name;

                this.log('Hello ' + name + '.');
                setDeveloper(name);

                this.log('Initializing nio context for developer', name);

                _context3.prev = 5;
                _context3.next = 8;
                return init();

              case 8:
                app.ctx = _context3.sent;
                _context3.next = 14;
                break;

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3['catch'](5);

                this.log('error initializing nio context', _context3.t0);

              case 14:
                _context3.prev = 14;

                if (is(app.ctx.productCollection, 'zero-len')) {
                  _context3.next = 35;
                  break;
                }

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context3.prev = 19;


                for (_iterator = app.ctx.productCollection[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  product = _step.value;

                  if (has(product, 'Commands')) {
                    if (is(product.Commands, 'function')) {
                      commands = product.Commands(app, tools);

                      app.use(commands);
                    }
                    if (has(product, 'onInit')) {
                      if (is(product.onInit, 'function')) {
                        product.onInit.call(app);
                      }
                    }
                  }
                }

                _context3.next = 27;
                break;

              case 23:
                _context3.prev = 23;
                _context3.t1 = _context3['catch'](19);
                _didIteratorError = true;
                _iteratorError = _context3.t1;

              case 27:
                _context3.prev = 27;
                _context3.prev = 28;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 30:
                _context3.prev = 30;

                if (!_didIteratorError) {
                  _context3.next = 33;
                  break;
                }

                throw _iteratorError;

              case 33:
                return _context3.finish(30);

              case 34:
                return _context3.finish(27);

              case 35:
                _context3.next = 40;
                break;

              case 37:
                _context3.prev = 37;
                _context3.t2 = _context3['catch'](14);

                console.log('error loading product extensions', _context3.t2);

              case 40:

                cb();

                _context3.next = 45;
                break;

              case 43:

                this.log('Hello. I am nio, your personal development assistant\n');

                this.prompt({
                  type: "input",
                  name: "developer_name",
                  message: "what is your name developer? "
                }, function () {
                  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(answer) {
                    var developer_name, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _product, _commands;

                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            developer_name = answer.developer_name;


                            _this.log('Hello ' + developer_name + '.');

                            setDeveloper(developer_name);

                            _this.log('Initializing nio context for developer', developer_name);
                            _context2.prev = 4;
                            _context2.next = 7;
                            return init();

                          case 7:
                            app.ctx = _context2.sent;
                            _context2.next = 13;
                            break;

                          case 10:
                            _context2.prev = 10;
                            _context2.t0 = _context2['catch'](4);

                            _this.log('error initializing nio context', _context2.t0);

                          case 13:
                            _context2.prev = 13;

                            if (is(app.ctx.productCollection, 'zero-len')) {
                              _context2.next = 34;
                              break;
                            }

                            _iteratorNormalCompletion2 = true;
                            _didIteratorError2 = false;
                            _iteratorError2 = undefined;
                            _context2.prev = 18;


                            for (_iterator2 = app.ctx.productCollection[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                              _product = _step2.value;

                              if (has(_product, 'Commands')) {
                                if (is(_product.Commands, 'function')) {
                                  _commands = _product.Commands(app, tools);

                                  app.use(_commands);
                                }
                                if (has(_product, 'onInit')) {
                                  if (is(_product.onInit, 'function')) {
                                    _product.onInit.call(app);
                                  }
                                }
                              }
                            }

                            _context2.next = 26;
                            break;

                          case 22:
                            _context2.prev = 22;
                            _context2.t1 = _context2['catch'](18);
                            _didIteratorError2 = true;
                            _iteratorError2 = _context2.t1;

                          case 26:
                            _context2.prev = 26;
                            _context2.prev = 27;

                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                              _iterator2.return();
                            }

                          case 29:
                            _context2.prev = 29;

                            if (!_didIteratorError2) {
                              _context2.next = 32;
                              break;
                            }

                            throw _iteratorError2;

                          case 32:
                            return _context2.finish(29);

                          case 33:
                            return _context2.finish(26);

                          case 34:
                            _context2.next = 39;
                            break;

                          case 36:
                            _context2.prev = 36;
                            _context2.t2 = _context2['catch'](13);

                            console.log('error loading product extensions', _context2.t2);

                          case 39:
                            cb();

                          case 40:
                          case 'end':
                            return _context2.stop();
                        }
                      }
                    }, _callee2, _this, [[4, 10], [13, 36], [18, 22, 26, 34], [27,, 29, 33]]);
                  }));

                  return function (_x3) {
                    return ref.apply(this, arguments);
                  };
                }());

              case 45:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[5, 11], [14, 37], [19, 23, 27, 35], [28,, 30, 34]]);
      }));

      return function (_x, _x2) {
        return ref.apply(this, arguments);
      };
    }());

    ctx.command('who', 'who is the current developer').action(function (args, cb) {
      var currentName = getDeveloper();
      ctx.log(currentName + ' is the current developer');
      cb();
    });

    ctx.command('bye', 'bids farewell to nio and unsets the current developer').action(function (args, cb) {
      var currentName = getDeveloper();
      ctx.log('Good bye ' + currentName + '.');
      setDeveloper('');
      ctx.exec('exit', cb);
    });

    ctx.command('ctx', 'logs the nio context').action(function (args, cb) {
      ctx.log('nio context ->', app.ctx);
      cb();
    });

    /* ctx
     .command('bots list', 'lists currently running hangar bots')
     .action(async function(args, cb){
     let list = await app.bots.list()
     this.log('bots -> list', list)
     cb()
     })*/

    /*  ctx
     .command('ext explore [folder]', 'launch file explorer')
     .action(function (args) {
      return new Promise((resolve, reject)=> {
      this.log('explore args', args)
      folderExplorer('Please select your folder', process.cwd(),(folder)=>{
      this.log('you chose folder -> ', folder)
      resolve()
      })
       })
      })*/
  };
};

var _inquirerFolderExplorer = require('inquirer-folder-explorer');

var _inquirerFolderExplorer2 = _interopRequireDefault(_inquirerFolderExplorer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

module.exports = exports['default'];