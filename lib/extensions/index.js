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
    var has = lodash.has;
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
                return app.init();

              case 2:
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

    ctx.command('hello [name]', 'greets nio and sets current developer').action(function (args) {
      var _this = this;

      return new Promise(function (resolve, reject) {

        if (has(args, 'name')) {
          var name = args.name;

          _this.log('Hello ' + name + '.');
          setDeveloper(name);
          resolve();
        } else {

          _this.log('Hello. I am nio, your personal development assistant\n');

          _this.prompt({
            type: "input",
            name: "developer_name",
            message: "what is your name developer? "
          }, function (answer) {
            var developer_name = answer.developer_name;


            _this.log('Hello ' + developer_name + '.');

            setDeveloper(developer_name);

            _this.log('Initializing nio context for developer', developer_name);

            init();

            resolve();
          });
        }
      });
    });

    ctx.command('who', 'who is the current developer').action(function (args, cb) {
      var currentName = getDeveloper();
      this.log(currentName + ' is the current developer');
      cb();
    });

    ctx.command('bye', 'bids farewell to nio and unsets the current developer').action(function (args, cb) {
      var currentName = getDeveloper();
      this.log('Good bye ' + currentName + '.');
      setDeveloper('');
      ctx.exec('exit', cb);
    });

    ctx.command('ctx', 'logs the nio context').action(function (args, cb) {
      this.log('nio context ->', app.ctx);
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