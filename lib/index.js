'use strict';

var _vorpal = require('vorpal');

var _vorpal2 = _interopRequireDefault(_vorpal);

var _extensions = require('./extensions');

var _extensions2 = _interopRequireDefault(_extensions);

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

var _tools = require('./tools');

var _tools2 = _interopRequireDefault(_tools);

var _nioTools = require('nio-tools');

var _nioTools2 = _interopRequireDefault(_nioTools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

module.exports = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var has, is, app, ctx, ext, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, product, commands;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            has = _nioTools2.default.has;
            is = _nioTools2.default.is;
            app = (0, _vorpal2.default)();


            app.localStorage('nio');

            app.init = _core2.default.init;
            app.bots = _core2.default.bots;
            app.shelter = _core2.default.shelter;
            app.products = _core2.default.products;

            ctx = {};
            _context.prev = 9;
            _context.next = 12;
            return app.init(app, _tools2.default);

          case 12:
            ctx = _context.sent;
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context['catch'](9);

            console.log('error initializing nio context', _context.t0);

          case 18:

            app.ctx = ctx || {};

            ext = (0, _extensions2.default)(app, _tools2.default);


            app.use(ext);
            _context.prev = 21;

            if (is(app.ctx.productCollection, 'zero-len')) {
              _context.next = 42;
              break;
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 26;


            for (_iterator = app.ctx.productCollection[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              product = _step.value;

              if (has(product, 'Commands')) {
                if (is(product.Commands, 'function')) {
                  commands = product.Commands(app, _tools2.default);

                  app.use(commands);
                }
                if (has(product, 'onInit')) {
                  if (is(product.onInit, 'function')) {
                    product.onInit.call(app);
                  }
                }
              }
            }

            _context.next = 34;
            break;

          case 30:
            _context.prev = 30;
            _context.t1 = _context['catch'](26);
            _didIteratorError = true;
            _iteratorError = _context.t1;

          case 34:
            _context.prev = 34;
            _context.prev = 35;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 37:
            _context.prev = 37;

            if (!_didIteratorError) {
              _context.next = 40;
              break;
            }

            throw _iteratorError;

          case 40:
            return _context.finish(37);

          case 41:
            return _context.finish(34);

          case 42:
            _context.next = 47;
            break;

          case 44:
            _context.prev = 44;
            _context.t2 = _context['catch'](21);

            console.log('error loading product extensions', _context.t2);

          case 47:
            return _context.abrupt('return', app.delimiter('nio$').log('' + (app.ctx.developer === '' ? 'Welcome developer, please say hello to initialize products' : 'Welcome back ' + app.ctx.developer)).show());

          case 48:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[9, 15], [21, 44], [26, 30, 34, 42], [35,, 37, 41]]);
  }));

  function nio() {
    return ref.apply(this, arguments);
  }

  return nio;
}();