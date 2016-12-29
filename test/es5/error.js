'use strict';
// global test classes

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ErrorSuite = function (_Suite) {
  _inherits(ErrorSuite, _Suite);

  function ErrorSuite() {
    _classCallCheck(this, ErrorSuite);

    return _possibleConstructorReturn(this, (ErrorSuite.__proto__ || Object.getPrototypeOf(ErrorSuite)).apply(this, arguments));
  }

  _createClass(ErrorSuite, [{
    key: 'setup',
    value: function setup() {
      return regeneratorRuntime.async(function setup$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(_get(ErrorSuite.prototype.__proto__ || Object.getPrototypeOf(ErrorSuite.prototype), 'setup', this).call(this));

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: 'teardown',
    value: function teardown() {
      return regeneratorRuntime.async(function teardown$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(_get(ErrorSuite.prototype.__proto__ || Object.getPrototypeOf(ErrorSuite.prototype), 'teardown', this).call(this));

            case 2:
            case 'end':
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }]);

  return ErrorSuite;
}(Suite);

{
  (function () {
    // error scope
    var scope = 'error';
    var error = new Suite(scope, 'Description of Error Suite');
    var t = void 0; // temporary variable as a workaround for Edge 15.14986 issue #12
    var isIndexHtml = false;

    error.test = t = function (_ErrorSuite) {
      _inherits(DummyTest, _ErrorSuite);

      function DummyTest() {
        _classCallCheck(this, DummyTest);

        return _possibleConstructorReturn(this, (DummyTest.__proto__ || Object.getPrototypeOf(DummyTest)).apply(this, arguments));
      }

      return DummyTest;
    }(ErrorSuite);

    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && !decodeURIComponent(window.location.href).match(/^.*[^_a-zA-Z0-9]TestSuites=([_a-zA-Z0-9,]*).*$/)) {
      isIndexHtml = true;
    }

    if (!isIndexHtml) {
      (typeof suite === 'function' ? suite : describe)('Suite error test', function () {
        (typeof suite === 'function' ? suite : describe)('.test setter error test', function () {
          (typeof test === 'function' ? test : it)('duplicate class names', function () {
            assert.throws(function () {
              error.test = t = function (_ErrorSuite2) {
                _inherits(DuplicateClass, _ErrorSuite2);

                function DuplicateClass() {
                  _classCallCheck(this, DuplicateClass);

                  return _possibleConstructorReturn(this, (DuplicateClass.__proto__ || Object.getPrototypeOf(DuplicateClass)).apply(this, arguments));
                }

                return DuplicateClass;
              }(ErrorSuite);
              error.test = t = function (_ErrorSuite3) {
                _inherits(DuplicateClass, _ErrorSuite3);

                function DuplicateClass() {
                  _classCallCheck(this, DuplicateClass);

                  return _possibleConstructorReturn(this, (DuplicateClass.__proto__ || Object.getPrototypeOf(DuplicateClass)).apply(this, arguments));
                }

                return DuplicateClass;
              }(ErrorSuite);
            }, /Suite[.]error: class DuplicateClass already exists/);
          });

          (typeof test === 'function' ? test : it)('duplicate class mixin names', function () {
            assert.throws(function () {
              error.test = function (base) {
                return function (_base) {
                  _inherits(DuplicateMixin, _base);

                  function DuplicateMixin() {
                    _classCallCheck(this, DuplicateMixin);

                    return _possibleConstructorReturn(this, (DuplicateMixin.__proto__ || Object.getPrototypeOf(DuplicateMixin)).apply(this, arguments));
                  }

                  return DuplicateMixin;
                }(base);
              };
              error.test = function (base) {
                return function (_base2) {
                  _inherits(DuplicateMixin, _base2);

                  function DuplicateMixin() {
                    _classCallCheck(this, DuplicateMixin);

                    return _possibleConstructorReturn(this, (DuplicateMixin.__proto__ || Object.getPrototypeOf(DuplicateMixin)).apply(this, arguments));
                  }

                  return DuplicateMixin;
                }(base);
              };
            }, /Suite[.]error: class mixin DuplicateMixin already exists/);
          });

          (typeof test === 'function' ? test : it)('no class mixin name', function () {
            assert.throws(function () {
              error.test = function (base) {
                return function (_base3) {
                  _inherits(_class, _base3);

                  function _class() {
                    _classCallCheck(this, _class);

                    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
                  }

                  return _class;
                }(base);
              };
            }, /Suite[.]error: class mixin has no name /);
          });

          (typeof test === 'function' ? test : it)('null object', function () {
            assert.throws(function () {
              error.test = null;
            }, /Suite[.]error: null object is not expected/);
          });
        });

        (typeof suite === 'function' ? suite : describe)('testClass error test', function () {
          (typeof test === 'function' ? test : it)('inexistent class name', function () {
            assert.throws(function () {
              error.testClasses('InexistentClass,InexistentClass2');
            }, /Suite[.]error: Test InexistentClass is not defined/);
          });
        });

        (typeof suite === 'function' ? suite : describe)('generateClasses error test', function () {
          (typeof test === 'function' ? test : it)('unknown branch type', function () {
            assert.throws(function () {
              error.test = { '': 1 };
            }, /Suite[.]error: unknown branch type number/);
          });
        });

        (typeof suite === 'function' ? suite : describe)('generateClass error test', function () {
          (typeof test === 'function' ? test : it)('invalid chain.length', function () {
            assert.throws(function () {
              error.test = { '': 'InvalidMixin' };
            }, /Suite[.]error:generateClass invalid chain[.]length 1/);
          });

          (typeof test === 'function' ? test : it)('duplicate mixin', function () {
            assert.throws(function () {
              error.test = function (base) {
                return function (_base4) {
                  _inherits(DuplicateMixinBase, _base4);

                  function DuplicateMixinBase() {
                    _classCallCheck(this, DuplicateMixinBase);

                    return _possibleConstructorReturn(this, (DuplicateMixinBase.__proto__ || Object.getPrototypeOf(DuplicateMixinBase)).apply(this, arguments));
                  }

                  return DuplicateMixinBase;
                }(base);
              };
              error.test = {
                '': [{
                  DuplicateMixinBase: 'DuplicateMixin'
                }, {
                  DuplicateMixinBase: 'DuplicateMixin'
                }]
              };
            }, /Suite[.]error:generateClass mixin DuplicateMixin already exists/);
          });

          (typeof test === 'function' ? test : it)('duplicate class', function () {
            assert.throws(function () {
              error.test = function (base) {
                return function (_base5) {
                  _inherits(DuplicateMixinBase2, _base5);

                  function DuplicateMixinBase2() {
                    _classCallCheck(this, DuplicateMixinBase2);

                    return _possibleConstructorReturn(this, (DuplicateMixinBase2.__proto__ || Object.getPrototypeOf(DuplicateMixinBase2)).apply(this, arguments));
                  }

                  return DuplicateMixinBase2;
                }(base);
              };
              error.test = {
                DummyTest: [{
                  DuplicateMixinBase2: 'DuplicateClass'
                }, {
                  DuplicateMixinBase2: 'DuplicateClass'
                }]
              };
            }, /Suite[.]error:generateClass class DuplicateClass already exists/);
          });

          (typeof test === 'function' ? test : it)('inexistent global test class', function () {
            assert.throws(function () {
              error.test = {
                InexistentGlobalClass: 'InexistentGlobalClassAlias'
              };
            }, /Suite[.]error:generateClass global test class InexistentGlobalClass does not exist/);
          });

          (typeof test === 'function' ? test : it)('inexistent mixin', function () {
            assert.throws(function () {
              error.test = {
                '': {
                  InexistentMixin: 'InexistentMixinName'
                }
              };
            }, /Suite[.]error:generateClass mixin InexistentMixin does not exist/);
          });

          (typeof test === 'function' ? test : it)('inexistent mixin for class', function () {
            assert.throws(function () {
              error.test = {
                DummyTest: {
                  InexistentMixin2: 'InexistentMixinName2'
                }
              };
            }, /Suite[.]error:generateClass mixin InexistentMixin2 does not exist/);
          });
        });
      });
    }
  })();
} // error scope