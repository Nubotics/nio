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

            ctx = {};
            _context.prev = 8;
            _context.next = 11;
            return app.init(app, _tools2.default);

          case 11:
            ctx = _context.sent;
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context['catch'](8);

            console.log('error initializing nio context', _context.t0);

          case 17:

            app.ctx = ctx || {};

            ext = (0, _extensions2.default)(app, _tools2.default);


            app.use(ext);

            if (is(app.ctx.productCollection, 'zero-len')) {
              _context.next = 40;
              break;
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 24;


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

            _context.next = 32;
            break;

          case 28:
            _context.prev = 28;
            _context.t1 = _context['catch'](24);
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
            return _context.abrupt('return', app.delimiter('nio$').log('' + (app.ctx.developer === '' ? 'Welcome developer, please say hello' : 'Welcome back ' + app.ctx.developer)).show());

          case 41:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[8, 14], [24, 28, 32, 40], [33,, 35, 39]]);
  }));

  return function nio() {
    return ref.apply(this, arguments);
  };
}();