'use strict';
/*
require('babel-polyfill');
const chai = require('chai');
const assert = chai.assert;
const Suite = require('../../Suite.min.js');
Suite.debug = true;
*/
// global test classes

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' ? window : global).ErrorSuite = function (_Suite) {
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
    var scope = 'error2';
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
      (typeof suite === 'function' ? suite : describe)('Suite utilities error test', function () {
        (typeof test === 'function' ? test : it)('Suite.permute error', function () {
          assert.throws(function () {
            Suite.permute(null, function () {
              return 'a';
            });
          }, /null/);
        });

        (typeof test === 'function' ? test : it)('Suite.permute length error', function () {
          var count = 0;

          var Targets = function () {
            function Targets() {
              _classCallCheck(this, Targets);

              this[0] = 'a';
              this[1] = 'b';
            }

            _createClass(Targets, [{
              key: 'length',
              get: function get() {
                if (count === 0) {
                  count++;
                  return 2;
                } else {
                  throw new Error('target length error');
                }
              }
            }]);

            return Targets;
          }();

          var targets = new Targets();
          assert.throws(function () {
            try {
              var i = Suite.permute(targets, function () {
                return 'a';
              });
            } catch (e) {
              //console.log('catching', e);
              throw e;
            }
          }, /target length error/);
        });

        (typeof test === 'function' ? test : it)('Suite.permute item error', function () {
          var targets = { '0': 'a', '1': 'b', '2': 'c', get '3'() {
              throw new Error('target item error');
            }, length: 4 };
          assert.throws(function () {
            try {
              var i = Suite.permute(targets, function () {
                return 'a';
              });
            } catch (e) {
              //console.log('catching', e);
              throw e;
            }
          }, /target item error/);
        });

        (typeof test === 'function' ? test : it)('Suite.permute item value error', function () {
          var _permute_original = Suite._permute;
          Suite._permute = function () {
            var obj = {};
            obj[Symbol.iterator] = function _iterator() {
              var index = 0;
              return {
                next: function next() {
                  return index < 3 ? { value: index++, done: false } : { get value() {
                      console.log('throwing target item value error');
                      throw new Error('target item value error');
                    },
                    done: false
                  };
                },
                'return': function _return() {
                  console.log('iterator return called');
                }
              };
            };
            return obj;
          }.bind(Suite);
          var targets = [1, 2, 3];
          assert.throws(function () {
            try {
              Suite.permute(targets, function () {
                return 'a';
              });
            } catch (e) {
              //console.log('catching', e);
              Suite._permute = _permute_original;
              throw e;
            }
          }, /target item value error/);
        });

        (typeof test === 'function' ? test : it)('Suite.permute recovery check', function () {
          var targets = ['a', 'b', 'c'];
          assert.deepEqual(Suite.permute(targets, function (list) {
            return list.join('');
          }), {
            "a": {
              "b": {
                "c": "abc"
              },
              "c": {
                "b": "acb"
              }
            },
            "b": {
              "a": {
                "c": "bac"
              },
              "c": {
                "a": "bca"
              }
            },
            "c": {
              "b": {
                "a": "cba"
              },
              "a": {
                "b": "cab"
              }
            }
          }, 'Suite.permute is recovered');
        });
      });

      (typeof suite === 'function' ? suite : describe)('Test iteration error test', function () {
        (typeof test === 'function' ? test : it)('iteration generator error', function _callee() {
          return regeneratorRuntime.async(function _callee$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  error.test = function (_ErrorSuite2) {
                    _inherits(IterationErrorTest, _ErrorSuite2);

                    function IterationErrorTest() {
                      _classCallCheck(this, IterationErrorTest);

                      return _possibleConstructorReturn(this, (IterationErrorTest.__proto__ || Object.getPrototypeOf(IterationErrorTest)).apply(this, arguments));
                    }

                    _createClass(IterationErrorTest, [{
                      key: 'iteration',
                      value: regeneratorRuntime.mark(function iteration() {
                        return regeneratorRuntime.wrap(function iteration$(_context3) {
                          while (1) {
                            switch (_context3.prev = _context3.next) {
                              case 0:
                                _context3.next = 2;
                                return 1;

                              case 2:
                                _context3.next = 4;
                                return 2;

                              case 4:
                                throw new Error('iteration error');

                              case 5:
                              case 'end':
                                return _context3.stop();
                            }
                          }
                        }, iteration, this);
                      })
                    }, {
                      key: 'operation',
                      value: function operation(parameters) {
                        return regeneratorRuntime.async(function operation$(_context4) {
                          while (1) {
                            switch (_context4.prev = _context4.next) {
                              case 0:
                                console.log('parameter = ' + parameters);

                              case 1:
                              case 'end':
                                return _context4.stop();
                            }
                          }
                        }, null, this);
                      }
                    }, {
                      key: 'checkpoint',
                      value: function checkpoint(parameters) {
                        return regeneratorRuntime.async(function checkpoint$(_context5) {
                          while (1) {
                            switch (_context5.prev = _context5.next) {
                              case 0:
                              case 'end':
                                return _context5.stop();
                            }
                          }
                        }, null, this);
                      }
                    }]);

                    return IterationErrorTest;
                  }(ErrorSuite);
                  try {
                    new error.leafClasses.IterationErrorTest().run().catch(function (e) {
                      return console.log(e);
                    });
                  } catch (e) {
                    console.log(e);
                  }

                case 2:
                case 'end':
                  return _context6.stop();
              }
            }
          }, null, this);
        });

        (typeof test === 'function' ? test : it)('iteration generator name error', function _callee2() {
          return regeneratorRuntime.async(function _callee2$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  error.test = function (_ErrorSuite3) {
                    _inherits(IterationErrorTest2, _ErrorSuite3);

                    function IterationErrorTest2() {
                      _classCallCheck(this, IterationErrorTest2);

                      return _possibleConstructorReturn(this, (IterationErrorTest2.__proto__ || Object.getPrototypeOf(IterationErrorTest2)).apply(this, arguments));
                    }

                    _createClass(IterationErrorTest2, [{
                      key: 'iteration',
                      value: regeneratorRuntime.mark(function iteration() {
                        return regeneratorRuntime.wrap(function iteration$(_context7) {
                          while (1) {
                            switch (_context7.prev = _context7.next) {
                              case 0:
                                _context7.next = 2;
                                return { name: 'iteration 1', value: '1' };

                              case 2:
                                _context7.next = 4;
                                return { name: 'iteration 2', value: '1' };

                              case 4:
                                _context7.next = 6;
                                return new (function () {
                                  function _class() {
                                    _classCallCheck(this, _class);
                                  }

                                  _createClass(_class, [{
                                    key: 'value',
                                    get: function get() {
                                      return 3;
                                    }
                                  }, {
                                    key: 'name',
                                    get: function get() {
                                      throw new Error('iteration name error');
                                    }
                                  }]);

                                  return _class;
                                }())();

                              case 6:
                              case 'end':
                                return _context7.stop();
                            }
                          }
                        }, iteration, this);
                      })
                    }, {
                      key: 'operation',
                      value: function operation(parameters) {
                        return regeneratorRuntime.async(function operation$(_context8) {
                          while (1) {
                            switch (_context8.prev = _context8.next) {
                              case 0:
                                console.log('parameter = ' + parameters);

                              case 1:
                              case 'end':
                                return _context8.stop();
                            }
                          }
                        }, null, this);
                      }
                    }, {
                      key: 'checkpoint',
                      value: function checkpoint(parameters) {
                        return regeneratorRuntime.async(function checkpoint$(_context9) {
                          while (1) {
                            switch (_context9.prev = _context9.next) {
                              case 0:
                              case 'end':
                                return _context9.stop();
                            }
                          }
                        }, null, this);
                      }
                    }]);

                    return IterationErrorTest2;
                  }(ErrorSuite);
                  try {
                    new error.leafClasses.IterationErrorTest2().run().catch(function (e) {
                      return console.log(e);
                    });
                  } catch (e) {
                    console.log(e);
                  }

                case 2:
                case 'end':
                  return _context10.stop();
              }
            }
          }, null, this);
        });
      });

      (typeof suite === 'function' ? suite : describe)('Test scenario error test', function () {
        (typeof test === 'function' ? test : it)('scenario generator error', function _callee3() {
          return regeneratorRuntime.async(function _callee3$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  error.test = function (_ErrorSuite4) {
                    _inherits(ScenarioErrorTest, _ErrorSuite4);

                    function ScenarioErrorTest() {
                      _classCallCheck(this, ScenarioErrorTest);

                      return _possibleConstructorReturn(this, (ScenarioErrorTest.__proto__ || Object.getPrototypeOf(ScenarioErrorTest)).apply(this, arguments));
                    }

                    _createClass(ScenarioErrorTest, [{
                      key: 'scenario',
                      value: regeneratorRuntime.mark(function scenario() {
                        return regeneratorRuntime.wrap(function scenario$(_context11) {
                          while (1) {
                            switch (_context11.prev = _context11.next) {
                              case 0:
                                throw new Error('scenario error');

                              case 1:
                              case 'end':
                                return _context11.stop();
                            }
                          }
                        }, scenario, this);
                      })
                    }, {
                      key: 'operation',
                      value: function operation() {
                        return regeneratorRuntime.async(function operation$(_context12) {
                          while (1) {
                            switch (_context12.prev = _context12.next) {
                              case 0:
                              case 'end':
                                return _context12.stop();
                            }
                          }
                        }, null, this);
                      }
                    }, {
                      key: 'checkpoint',
                      value: function checkpoint() {
                        return regeneratorRuntime.async(function checkpoint$(_context13) {
                          while (1) {
                            switch (_context13.prev = _context13.next) {
                              case 0:
                              case 'end':
                                return _context13.stop();
                            }
                          }
                        }, null, this);
                      }
                    }]);

                    return ScenarioErrorTest;
                  }(ErrorSuite);
                  try {
                    new error.leafClasses.ScenarioErrorTest().run().catch(function (e) {
                      return console.log(e);
                    });
                  } catch (e) {
                    console.log(e);
                  }

                case 2:
                case 'end':
                  return _context14.stop();
              }
            }
          }, null, this);
        });
      });
    }
  })();
} // error scope