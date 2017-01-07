var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
@license https://github.com/t2ym/scenarist/blob/master/LICENSE.md
Copyright (c) 2016, Tetsuya Mori <t2y3141592@gmail.com>. All rights reserved.
*/

(function (root, factory) {

  'use strict';

  /* istanbul ignore if: AMD is not tested */

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function () {
      return root.Suite = root.Suite || factory();
    });
  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
    try {
      new Function('return class $$A$$ {}');
      if (!module.exports.toString().match(/^class /)) {
        throw new Error('Suite.min.js requires babel-runtime');
      }
    } catch (e) {
      // Supply Babel runtime helpers
      module.exports._createClass = module.exports._createClass || require('babel-runtime/helpers/_create-class.js').default;
      module.exports._classCallCheck = module.exports._classCallCheck || require('babel-runtime/helpers/_class-call-check.js').default;
      module.exports._possibleConstructorReturn = module.exports._possibleConstructorReturn || require('babel-runtime/helpers/_possible-constructor-return.js').default;
      module.exports._inherits = module.exports._inherits || require('babel-runtime/helpers/_inherits.js').default;
    }
  } else {
    // Browser globals
    root.Suite = root.Suite || factory();
  }
})(this, function () {
  // UMD Definition above, do not remove this line
  'use strict';

  var Suite = function () {
    _createClass(Suite, null, [{
      key: 'reconnectable',
      get: function get() {
        return true;
      }
    }, {
      key: 'skipAfterFailure',
      get: function get() {
        return false;
      }
    }]);

    function Suite(target) {
      var description = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : target + ' suite';

      _classCallCheck(this, Suite);

      if (Suite._name(this.constructor) === 'Suite') {
        // suite instance
        this.scope = target || '';
        this.description = description;
        this.classes = {};
        this.leafClasses = {};
        this.branchScenarios = {};
        this.mixins = {};
        this.constructor.scopes = this.constructor.scopes || {};
        this.constructor.scopes[this.scope] = this;
        this.classSyntaxSupport = true;
        this.arrowFunctionSupport = true;
        try {
          new Function('return class A {}');
        } catch (e) {
          this.classSyntaxSupport = false;
        }
        if (!Suite.toString().match(/^class /)) {
          this.classSyntaxSupport = false; // Running as Suite.min.js
        }
        try {
          new Function('return () => 1');
        } catch (e) {
          this.arrowFunctionSupport = false;
        }
      } else {
        // test instance
        this.target = target;
      }
    }

    _createClass(Suite, [{
      key: 'uncamel',
      value: function uncamel(name) {
        return name.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').replace(/[ ]{1,}/g, ' ').replace(/^ /, '').toLowerCase();
      }
    }, {
      key: 'testClasses',
      value: function testClasses(tests) {
        var self = this;
        return (typeof tests === 'number' || tests.match(/^[0-9]$/) ? self.test[parseInt(tests)] : tests).split(/,/).map(function (name) {
          if (!self.classes[name]) {
            throw new Error('Suite.' + self.scope + ': Test ' + name + ' is not defined');
          }
          return self.classes[name];
        });
      }
    }, {
      key: 'updateLeafClasses',
      value: function updateLeafClasses(value) {
        var proto = value;
        var chain = [];
        var name = Suite._name(proto);
        var isLeaf = true;
        var scenario = '';
        while (Suite._name(proto) && Suite._name(proto) !== 'Suite') {
          chain.unshift(Suite._name(proto));
          proto = Object.getPrototypeOf(proto);
        }
        for (var i in chain) {
          scenario = scenario ? scenario + ',' + chain[i] : chain[i];
          if (i < chain.length - 1) {
            if (!this.branchScenarios[scenario]) {
              this.branchScenarios[scenario] = true;
            }
            if (this.leafClasses[chain[i]]) {
              delete this.leafClasses[chain[i]];
            }
          } else {
            if (this.branchScenarios[scenario]) {
              isLeaf = false;
            }
          }
        }
        if (isLeaf) {
          this.leafClasses[name] = value;
        }
      }
    }, {
      key: 'generateClasses',
      value: function generateClasses(branch, chain) {
        var _this = this;

        if (typeof branch === 'string') {
          var description = branch.split(/;/);
          if (description.length > 1) {
            branch = description.shift();
            description = description.join(';').replace(/^[\s]*/, '');
          } else {
            description = '';
          }
          if (this.constructor.debug) {
            console.log('string', branch || chain[chain.length - 1], chain, description);
          }
          this.generateClass(branch, chain, description);
        } else if ((typeof branch === 'undefined' ? 'undefined' : _typeof(branch)) === 'object' && !Array.isArray(branch)) {
          if (branch) {
            for (var prop in branch) {
              chain.push(prop);
              this.generateClasses(branch[prop], chain);
              chain.pop();
            }
          } else {
            if (this.constructor.debug) {
              console.log('null', branch, chain);
            }
            this.generateClass(branch, chain);
          }
        } else if ((typeof branch === 'undefined' ? 'undefined' : _typeof(branch)) === 'object' && Array.isArray(branch)) {
          branch.forEach(function (item) {
            _this.generateClasses(item, chain);
          });
        } else {
          throw new Error(this.constructor.name + '.' + this.scope + ': unknown branch type ' + (typeof branch === 'undefined' ? 'undefined' : _typeof(branch)) + branch);
        }
      }
    }, {
      key: 'generateClass',
      value: function generateClass(name, chain, description) {
        var _this2 = this;

        var self = this;
        var expression = void 0;
        if (!(chain.length >= (chain[0] ? 1 : 2))) {
          throw new Error(this.constructor.name + '.' + this.scope + ':generateClass invalid chain.length ' + chain.length);
        }
        if (!name) {
          name = chain[chain.length - 1];
        }
        if (!chain[0]) {
          // class mixin
          if (self.mixins[name]) {
            throw new Error(this.constructor.name + '.' + this.scope + ':generateClass mixin ' + name + ' already exists');
          }
          chain.forEach(function (c, i) {
            if (i === 0) {
              expression = 'base';
            } else if (self.mixins[c]) {
              expression = 'self.mixins.' + c + '(' + expression + ')';
            } else {
              throw new Error(_this2.constructor.name + '.' + _this2.scope + ':generateClass mixin ' + c + ' does not exist');
            }
          });
          expression = self.arrowFunctionSupport ? 'return (base) => ' + expression : 'return function (base) { return ' + expression + '; }';
          self.mixins[name] = new Function('self', expression)(self);
          if (self.constructor.debug) {
            console.log('generateClass mixins.' + name + ' = ' + expression);
          }
        } else {
          (function () {
            // class
            if (_this2.classes[name]) {
              throw new Error(_this2.constructor.name + '.' + _this2.scope + ':generateClass class ' + name + ' already exists');
            }
            chain.forEach(function (c, i) {
              if (i === 0) {
                if (self.classes[c]) {
                  expression = 'self.classes.' + c;
                } else if (new Function(self.constructor.name, 'return (typeof ' + c + ' === "function" && (new ' + c + '()) instanceof ' + self.constructor.name + ')')(self.constructor)) {
                  expression = c;
                } else {
                  throw new Error(_this2.constructor.name + '.' + _this2.scope + ':generateClass global test class ' + c + ' does not exist');
                }
              } else if (self.mixins[c]) {
                expression = 'self.mixins.' + c + '(' + expression + ')';
              } else {
                throw new Error(_this2.constructor.name + '.' + _this2.scope + ':generateClass mixin ' + c + ' does not exist');
              }
            });
            if (description) {
              description = description.replace(/"/g, '\\"').replace(/\n/g, ' ');
            }
            var prefix = !_this2.classSyntaxSupport && typeof Suite._createClass === 'function' && (typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' ? 'self.constructor.' : '';
            expression = chain.length === 1 && name === expression ? 'return ' + name : name === chain[chain.length - 1] ? 'return ' + expression : self.classSyntaxSupport ? 'return class ' + name + ' extends ' + expression + (description ? ' { get description() { return "' + description + '"; } }' : ' {}') : function (subclass, base, description) {
              // generate ES5 class by manipulating transpiled func.toString()
              return 'return (' + (description ? function (__BASE_CLASS__) {
                return function (_BASE_CLASS__) {
                  _inherits(__SUBCLASS__, _BASE_CLASS__);

                  function __SUBCLASS__() {
                    _classCallCheck(this, __SUBCLASS__);

                    return _possibleConstructorReturn(this, (__SUBCLASS__.__proto__ || Object.getPrototypeOf(__SUBCLASS__)).apply(this, arguments));
                  }

                  _createClass(__SUBCLASS__, [{
                    key: 'description',
                    get: function get() {
                      return 314159265358;
                    }
                  }]);

                  return __SUBCLASS__;
                }(__BASE_CLASS__);
              } : function (__BASE_CLASS__) {
                return function (_BASE_CLASS__2) {
                  _inherits(__SUBCLASS__, _BASE_CLASS__2);

                  function __SUBCLASS__() {
                    _classCallCheck(this, __SUBCLASS__);

                    return _possibleConstructorReturn(this, (__SUBCLASS__.__proto__ || Object.getPrototypeOf(__SUBCLASS__)).apply(this, arguments));
                  }

                  return __SUBCLASS__;
                }(__BASE_CLASS__);
              }).toString().replace(/__cov_[^. ]*[.][a-z]\[\'[0-9]*\'\](\[[0-9]*\])?\+\+[;,]?/g, '') // trim istanbul coverage counters
              .replace(/__SUBCLASS__/g, subclass).replace(/_inherits|_classCallCheck|_createClass|_possibleConstructorReturn/g, prefix + '$&').replace(/ 314159265358;?/g, ' "' + description + '";') + ')(' + base + ');';
            }(name, expression, description);
            self.classes[name] = new Function('self', expression)(self);
            self.updateLeafClasses(self.classes[name]);
            if (self.constructor.debug) {
              console.log('generateClass classes.' + name + ' = ' + expression);
            }
          })();
        }
      }
    }, {
      key: 'setup',
      value: function setup() {
        return regeneratorRuntime.async(function setup$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case 'end':
                return _context.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: 'forEvent',
      value: function forEvent(element, type, trigger, condition) {
        return new Promise(function (resolve) {
          element.addEventListener(type, function onEvent(event) {
            if (!condition || typeof condition === 'boolean' && condition && Polymer.dom(event).rootTarget === element || typeof condition === 'function' && condition(element, type, event)) {
              element.removeEventListener(type, onEvent);
              resolve(event);
            }
          });
          if (trigger) {
            trigger();
          }
        });
      }
    }, {
      key: 'scenario',
      value: regeneratorRuntime.mark(function scenario() {
        var steps, proto;
        return regeneratorRuntime.wrap(function scenario$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // trick to unveil overridden methods
                steps = [];
                proto = Object.getPrototypeOf(this);

                while (proto.constructor.name && proto.constructor.name !== 'Object') {
                  steps.unshift({
                    name: proto.hasOwnProperty('description') ? proto.description : this.uncamel(Suite._name(proto.constructor)),
                    iteration: proto.hasOwnProperty('iteration') ? proto.iteration : undefined,
                    operation: proto.hasOwnProperty('operation') ? proto.operation : undefined,
                    checkpoint: proto.hasOwnProperty('checkpoint') ? proto.checkpoint : undefined,
                    ctor: proto.constructor
                  });
                  proto = Object.getPrototypeOf(proto);
                }
                return _context2.delegateYield(steps, 't0', 4);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, scenario, this);
      })
    }, {
      key: 'teardown',
      value: function teardown() {
        return regeneratorRuntime.async(function teardown$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
              case 'end':
                return _context3.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: 'run',
      value: function run(classes, target) {
        var self;
        return regeneratorRuntime.async(function run$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                // TODO: return a Promise object?
                self = this;

                if (Suite._name(self.constructor) === 'Suite') {
                  (function () {
                    // Suite Runner
                    var testSuites = [];
                    if (typeof classes === 'number' || typeof classes === 'string') {
                      // Number 0
                      // Number string '0'
                      // CSV string 'Test1,Test2'
                      testSuites = self.testClasses(classes);
                    } else if ((typeof classes === 'undefined' ? 'undefined' : _typeof(classes)) === 'object' && Array.isArray(classes)) {
                      // String Array [ 'Test1', 'Test2' ]
                      // Class Array [ Test1, Test2 ]
                      // TODO: handle errors if item is neither a string nor a class
                      testSuites = classes.map(function (item) {
                        return typeof item === 'string' ? self.classes[item] : item;
                      });
                    } else if ((typeof classes === 'undefined' ? 'undefined' : _typeof(classes)) === 'object' && !Array.isArray(classes) && classes) {
                      // Object { Test1: Test1, Test2: Test2 } - property names are discarded
                      for (var c in classes) {
                        testSuites.push(classes[c]);
                      }
                    }
                    (typeof suite === 'function' ? suite : describe)(self.description || self.scope + ' suite', function () {
                      var _this5 = this;

                      // Note: Not waiting for async forEach so that each subsuite runs under the parent suite
                      Promise.all(testSuites.map(function _callee(s) {
                        return regeneratorRuntime.async(function _callee$(_context4) {
                          while (1) {
                            switch (_context4.prev = _context4.next) {
                              case 0:
                                return _context4.abrupt('return', new s(target).run());

                              case 1:
                              case 'end':
                                return _context4.stop();
                            }
                          }
                        }, null, _this5);
                      })).then(function () {
                        if (self.constructor.debug) {
                          console.log(self.description + ' done for ', classes);
                        }
                      });
                    });
                  })();
                } else {
                  (function () {
                    // Scenario Runner
                    var overrideToString = function overrideToString(func, ctor) {
                      func.toString = function () {
                        return ctor.toString();
                      };return func;
                    };
                    (typeof suite === 'function' ? suite : describe)(Object.getOwnPropertyDescriptor(Object.getPrototypeOf(self), 'description') ? self.description : self.uncamel(Suite._name(self.constructor)), function _callee6() {
                      var _loop, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, step;

                      return regeneratorRuntime.async(function _callee6$(_context9) {
                        while (1) {
                          switch (_context9.prev = _context9.next) {
                            case 0:
                              (typeof suiteSetup === 'function' ? suiteSetup : before)(function _callee2() {
                                return regeneratorRuntime.async(function _callee2$(_context5) {
                                  while (1) {
                                    switch (_context5.prev = _context5.next) {
                                      case 0:
                                        _context5.next = 2;
                                        return regeneratorRuntime.awrap(self.setup());

                                      case 2:
                                      case 'end':
                                        return _context5.stop();
                                    }
                                  }
                                }, null, this);
                              });

                              _loop = function _loop(step) {
                                if (step.operation || step.checkpoint) {
                                  if (step.iteration) {
                                    var _loop2 = function _loop2(parameters) {
                                      (typeof test === 'function' ? test : it)(parameters.name ? typeof parameters.name === 'function' ? parameters.name(parameters) : parameters.name : step.name, overrideToString(function _callee4() {
                                        return regeneratorRuntime.async(function _callee4$(_context7) {
                                          while (1) {
                                            switch (_context7.prev = _context7.next) {
                                              case 0:
                                                if (!(self.constructor.skipAfterFailure && self.__failed)) {
                                                  _context7.next = 3;
                                                  break;
                                                }

                                                this.skip();
                                                return _context7.abrupt('return');

                                              case 3:
                                                self.__failed = true;

                                                if (!step.operation) {
                                                  _context7.next = 7;
                                                  break;
                                                }

                                                _context7.next = 7;
                                                return regeneratorRuntime.awrap(step.operation.call(self, parameters));

                                              case 7:
                                                if (!step.checkpoint) {
                                                  _context7.next = 10;
                                                  break;
                                                }

                                                _context7.next = 10;
                                                return regeneratorRuntime.awrap(step.checkpoint.call(self, parameters));

                                              case 10:
                                                self.__failed = false;

                                              case 11:
                                              case 'end':
                                                return _context7.stop();
                                            }
                                          }
                                        }, null, this);
                                      }, step.ctor));
                                    };

                                    // suite() has to be commented out since subsuites are executed after all the other sibling tests
                                    //suite(step.name + ' iterations', async function () {
                                    var _iteratorNormalCompletion2 = true;
                                    var _didIteratorError2 = false;
                                    var _iteratorError2 = undefined;

                                    try {
                                      for (var _iterator2 = step.iteration.apply(self)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                        var parameters = _step2.value;

                                        _loop2(parameters);
                                      }
                                      //});
                                    } catch (err) {
                                      _didIteratorError2 = true;
                                      _iteratorError2 = err;
                                    } finally {
                                      try {
                                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                          _iterator2.return();
                                        }
                                      } finally {
                                        if (_didIteratorError2) {
                                          throw _iteratorError2;
                                        }
                                      }
                                    }
                                  } else {
                                    (typeof test === 'function' ? test : it)(step.name, overrideToString(function _callee5() {
                                      return regeneratorRuntime.async(function _callee5$(_context8) {
                                        while (1) {
                                          switch (_context8.prev = _context8.next) {
                                            case 0:
                                              if (!(self.constructor.skipAfterFailure && self.__failed)) {
                                                _context8.next = 3;
                                                break;
                                              }

                                              this.skip();
                                              return _context8.abrupt('return');

                                            case 3:
                                              self.__failed = true;

                                              if (!step.operation) {
                                                _context8.next = 7;
                                                break;
                                              }

                                              _context8.next = 7;
                                              return regeneratorRuntime.awrap(step.operation.call(self));

                                            case 7:
                                              if (!step.checkpoint) {
                                                _context8.next = 10;
                                                break;
                                              }

                                              _context8.next = 10;
                                              return regeneratorRuntime.awrap(step.checkpoint.call(self));

                                            case 10:
                                              self.__failed = false;

                                            case 11:
                                            case 'end':
                                              return _context8.stop();
                                          }
                                        }
                                      }, null, this);
                                    }, step.ctor));
                                  }
                                }
                              };

                              _iteratorNormalCompletion = true;
                              _didIteratorError = false;
                              _iteratorError = undefined;
                              _context9.prev = 5;
                              for (_iterator = self.scenario()[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                step = _step.value;

                                _loop(step);
                              }

                              _context9.next = 13;
                              break;

                            case 9:
                              _context9.prev = 9;
                              _context9.t0 = _context9['catch'](5);
                              _didIteratorError = true;
                              _iteratorError = _context9.t0;

                            case 13:
                              _context9.prev = 13;
                              _context9.prev = 14;

                              if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                              }

                            case 16:
                              _context9.prev = 16;

                              if (!_didIteratorError) {
                                _context9.next = 19;
                                break;
                              }

                              throw _iteratorError;

                            case 19:
                              return _context9.finish(16);

                            case 20:
                              return _context9.finish(13);

                            case 21:
                              (typeof suiteTeardown === 'function' ? suiteTeardown : after)(function _callee3() {
                                return regeneratorRuntime.async(function _callee3$(_context6) {
                                  while (1) {
                                    switch (_context6.prev = _context6.next) {
                                      case 0:
                                        _context6.next = 2;
                                        return regeneratorRuntime.awrap(self.teardown());

                                      case 2:
                                      case 'end':
                                        return _context6.stop();
                                    }
                                  }
                                }, null, this);
                              });

                            case 22:
                            case 'end':
                              return _context9.stop();
                          }
                        }
                      }, null, this, [[5, 9, 13, 21], [14,, 16, 20]]);
                    });
                  })();
                }

              case 2:
              case 'end':
                return _context10.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: 'test',
      set: function set(value) {
        if (typeof value === 'function') {
          var name = Suite._name(value);
          if (name) {
            // test class
            if (this.classes[name]) {
              // test class with the name already exists
              throw new Error(this.constructor.name + '.' + this.scope + ': class ' + name + ' already exists');
            } else {
              // register a new test class with the name
              this.classes[name] = value;
              this.updateLeafClasses(value);
            }
          } else {
            // test class mixin
            name = Suite._name(value(null));
            if (name) {
              if (this.mixins[name]) {
                // test class mixin with the name already exists
                throw new Error(this.constructor.name + '.' + this.scope + ': class mixin ' + name + ' already exists');
              } else {
                // register a new test class mixin with the name
                this.mixins[name] = value;
              }
            } else {
              // no name for the test class mixin
              throw new Error(this.constructor.name + '.' + this.scope + ': class mixin has no name ' + value.toString());
            }
          }
        } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
          if (value) {
            // branch object
            this.generateClasses(value, []);
          } else {
            throw new Error(this.constructor.name + '.' + this.scope + ': null object is not expected');
          }
        }
      },
      get: function get() {
        var list = [];
        for (var c in this.leafClasses) {
          list.push(this.leafClasses[c]);
        }
        var reconnectableList = [];
        for (var i in list) {
          if (list[i].reconnectable) {
            if (reconnectableList.length === 0) {
              reconnectableList.push([list[i]]);
            } else {
              var last = reconnectableList[reconnectableList.length - 1];
              if (last.length === 0) {
                last.push(list[i]);
              } else {
                if (last[last.length - 1].reconnectable) {
                  last.push(list[i]);
                } else {
                  reconnectableList.push([list[i]]);
                }
              }
            }
          } else {
            reconnectableList.push([list[i]]);
          }
        }
        // [ 'UnreconnectableTest', 'ReconnectableTest,ReconnectableTest,...', 'UnreconnectableTest', ...]
        return reconnectableList.map(function (l) {
          return l.map(function (c) {
            return Suite._name(c);
          }).join(',');
        });
      }
    }], [{
      key: '_name',
      value: function _name(func) {
        return (func.hasOwnProperty('name') ? func.name : func.toString().replace(/^[\S\s]*?function\s*/, "").replace(/[\s\(\/][\S\s]+$/, "")).replace(/^_?class$/, '');
      }
    }, {
      key: 'repeat',
      value: function repeat(target, count, subclass) {
        var scenario = {};
        if (count < 1) {
          scenario = subclass;
        } else {
          scenario[target] = subclass;
          count--;
          while (count-- > 0) {
            scenario = _defineProperty({}, target, scenario);
          }
        }
        return scenario;
      }
    }, {
      key: '_permute',
      value: regeneratorRuntime.mark(function _permute(targets) {
        var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var result = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var subclass = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (list) {
          return list.join('Then');
        };

        var len, j, swap, append, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, sub;

        return regeneratorRuntime.wrap(function _permute$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                append = function append() {
                  // TODO: cache cursor
                  var cursor = result;
                  for (var k = 0; k < len; k++) {
                    if (!cursor[targets[k]]) {
                      if (k >= len - 1) {
                        cursor[targets[k]] = subclass(targets);
                      } else {
                        cursor[targets[k]] = {};
                      }
                    }
                    cursor = cursor[targets[k]];
                  }
                };

                swap = function swap() {
                  if (j !== i) {
                    var tmp = targets[i];
                    targets[i] = targets[j];
                    targets[j] = tmp;
                  }
                };

                len = targets.length;
                j = void 0;

                if (!(i >= len - 1)) {
                  _context11.next = 10;
                  break;
                }

                _context11.next = 7;
                return targets;

              case 7:
                append();
                _context11.next = 44;
                break;

              case 10:
                j = i;

              case 11:
                if (!(j < len)) {
                  _context11.next = 44;
                  break;
                }

                swap();
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context11.prev = 16;
                _iterator3 = this._permute(targets, i + 1, result)[Symbol.iterator]();

              case 18:
                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                  _context11.next = 26;
                  break;
                }

                sub = _step3.value;
                _context11.next = 22;
                return targets;

              case 22:
                append();

              case 23:
                _iteratorNormalCompletion3 = true;
                _context11.next = 18;
                break;

              case 26:
                _context11.next = 32;
                break;

              case 28:
                _context11.prev = 28;
                _context11.t0 = _context11['catch'](16);
                _didIteratorError3 = true;
                _iteratorError3 = _context11.t0;

              case 32:
                _context11.prev = 32;
                _context11.prev = 33;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 35:
                _context11.prev = 35;

                if (!_didIteratorError3) {
                  _context11.next = 38;
                  break;
                }

                throw _iteratorError3;

              case 38:
                return _context11.finish(35);

              case 39:
                return _context11.finish(32);

              case 40:
                swap();

              case 41:
                j++;
                _context11.next = 11;
                break;

              case 44:
              case 'end':
                return _context11.stop();
            }
          }
        }, _permute, this, [[16, 28, 32, 40], [33,, 35, 39]]);
      })
    }, {
      key: 'permute',
      value: function permute(targets, subclass) {
        var result = {};
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = this._permute(targets, 0, result, subclass)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var chain = _step4.value;
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        return result;
      }
    }]);

    return Suite;
  }();

  return Suite;
}); // UMD Definition