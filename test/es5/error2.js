'use strict';
/*
require('babel-polyfill');
const chai = require('chai');
const assert = chai.assert;
const Suite = require('../../Suite.es5.js');
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
  error.test = 1; // ineffective
  var empty = new Suite(''); // empty suite scope name
  Suite._name({});
  empty.run(null);

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
        var targets = { '0': 'a', '1': 'b', '2': 'c', length: 4 };
        Object.defineProperty(targets, '3', {
          get: function get() {
            throw new Error('target item error');
          }
        });
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
                error.test = t = function (_ErrorSuite2) {
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
                _context6.prev = 1;
                _context6.next = 4;
                return regeneratorRuntime.awrap(new error.leafClasses.IterationErrorTest().run());

              case 4:
                assert.isOk(false, 'No exception is thrown');
                _context6.next = 11;
                break;

              case 7:
                _context6.prev = 7;
                _context6.t0 = _context6['catch'](1);

                console.log('try { await run(); } catch (e) {}', _context6.t0);
                assert.throws(function () {
                  throw _context6.t0;
                }, /iteration error/);

              case 11:
              case 'end':
                return _context6.stop();
            }
          }
        }, null, this, [[1, 7]]);
      });

      (typeof test === 'function' ? test : it)('iteration generator name error', function _callee2() {
        return regeneratorRuntime.async(function _callee2$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                error.test = t = function (_ErrorSuite3) {
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
                _context10.prev = 1;
                _context10.next = 4;
                return regeneratorRuntime.awrap(new error.leafClasses.IterationErrorTest2().run());

              case 4:
                assert.isOk(false, 'No exception is thrown');
                _context10.next = 11;
                break;

              case 7:
                _context10.prev = 7;
                _context10.t0 = _context10['catch'](1);

                console.log('try { await run(); } catch (e) {}', _context10.t0);
                assert.throws(function () {
                  throw _context10.t0;
                }, /iteration name error/);

              case 11:
              case 'end':
                return _context10.stop();
            }
          }
        }, null, this, [[1, 7]]);
      });
    });

    (typeof suite === 'function' ? suite : describe)('Test scenario error test', function () {
      (typeof test === 'function' ? test : it)('scenario generator error', function _callee3() {
        return regeneratorRuntime.async(function _callee3$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                error.test = t = function (_ErrorSuite4) {
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
                _context14.prev = 1;
                _context14.next = 4;
                return regeneratorRuntime.awrap(new error.leafClasses.ScenarioErrorTest().run());

              case 4:
                assert.isOk(false, 'No exception is thrown');
                _context14.next = 11;
                break;

              case 7:
                _context14.prev = 7;
                _context14.t0 = _context14['catch'](1);

                console.log('try { await run(); } catch (e) {}', _context14.t0);
                assert.throws(function () {
                  throw _context14.t0;
                }, /scenario error/);

              case 11:
              case 'end':
                return _context14.stop();
            }
          }
        }, null, this, [[1, 7]]);
      });

      (typeof test === 'function' ? test : it)('scenario generator error handler', function _callee4() {
        return regeneratorRuntime.async(function _callee4$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                error.test = t = function (_ErrorSuite5) {
                  _inherits(ScenarioErrorTest2, _ErrorSuite5);

                  function ScenarioErrorTest2() {
                    _classCallCheck(this, ScenarioErrorTest2);

                    return _possibleConstructorReturn(this, (ScenarioErrorTest2.__proto__ || Object.getPrototypeOf(ScenarioErrorTest2)).apply(this, arguments));
                  }

                  _createClass(ScenarioErrorTest2, [{
                    key: 'scenario',
                    value: regeneratorRuntime.mark(function scenario() {
                      return regeneratorRuntime.wrap(function scenario$(_context15) {
                        while (1) {
                          switch (_context15.prev = _context15.next) {
                            case 0:
                              throw new Error('scenario error');

                            case 1:
                            case 'end':
                              return _context15.stop();
                          }
                        }
                      }, scenario, this);
                    })
                  }, {
                    key: 'operation',
                    value: function operation() {
                      return regeneratorRuntime.async(function operation$(_context16) {
                        while (1) {
                          switch (_context16.prev = _context16.next) {
                            case 0:
                            case 'end':
                              return _context16.stop();
                          }
                        }
                      }, null, this);
                    }
                  }, {
                    key: 'checkpoint',
                    value: function checkpoint() {
                      return regeneratorRuntime.async(function checkpoint$(_context17) {
                        while (1) {
                          switch (_context17.prev = _context17.next) {
                            case 0:
                            case 'end':
                              return _context17.stop();
                          }
                        }
                      }, null, this);
                    }
                  }, {
                    key: 'exception',
                    value: function exception(reject, _exception) {
                      reject(new Error('handled scenario error exception ' + _exception.message));
                      return true;
                    }
                  }]);

                  return ScenarioErrorTest2;
                }(ErrorSuite);
                _context18.prev = 1;
                _context18.next = 4;
                return regeneratorRuntime.awrap(new error.leafClasses.ScenarioErrorTest2().run());

              case 4:
                assert.isOk(false, 'No exception is thrown');
                _context18.next = 11;
                break;

              case 7:
                _context18.prev = 7;
                _context18.t0 = _context18['catch'](1);

                console.log('try { await run(); } catch (e) {}', _context18.t0);
                assert.throws(function () {
                  throw _context18.t0;
                }, /handled scenario error exception/);

              case 11:
              case 'end':
                return _context18.stop();
            }
          }
        }, null, this, [[1, 7]]);
      });

      (typeof test === 'function' ? test : it)('scenario generator error handler 2', function _callee5() {
        return regeneratorRuntime.async(function _callee5$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                error.test = t = function (_ErrorSuite6) {
                  _inherits(ScenarioErrorTest3, _ErrorSuite6);

                  function ScenarioErrorTest3() {
                    _classCallCheck(this, ScenarioErrorTest3);

                    return _possibleConstructorReturn(this, (ScenarioErrorTest3.__proto__ || Object.getPrototypeOf(ScenarioErrorTest3)).apply(this, arguments));
                  }

                  _createClass(ScenarioErrorTest3, [{
                    key: 'scenario',
                    value: regeneratorRuntime.mark(function scenario() {
                      return regeneratorRuntime.wrap(function scenario$(_context19) {
                        while (1) {
                          switch (_context19.prev = _context19.next) {
                            case 0:
                              throw new Error('scenario error');

                            case 1:
                            case 'end':
                              return _context19.stop();
                          }
                        }
                      }, scenario, this);
                    })
                  }, {
                    key: 'operation',
                    value: function operation() {
                      return regeneratorRuntime.async(function operation$(_context20) {
                        while (1) {
                          switch (_context20.prev = _context20.next) {
                            case 0:
                            case 'end':
                              return _context20.stop();
                          }
                        }
                      }, null, this);
                    }
                  }, {
                    key: 'checkpoint',
                    value: function checkpoint() {
                      return regeneratorRuntime.async(function checkpoint$(_context21) {
                        while (1) {
                          switch (_context21.prev = _context21.next) {
                            case 0:
                            case 'end':
                              return _context21.stop();
                          }
                        }
                      }, null, this);
                    }
                  }, {
                    key: 'exception',
                    value: function exception(reject, _exception2) {
                      // Handle exception by mocha
                      //(typeof test === 'function' ? test : it)('Exception on scenario', function() { throw exception; });
                    }
                  }]);

                  return ScenarioErrorTest3;
                }(ErrorSuite);
                _context22.prev = 1;
                _context22.next = 4;
                return regeneratorRuntime.awrap(new error.leafClasses.ScenarioErrorTest3().run());

              case 4:
                assert.isOk(false, 'No exception is thrown');
                _context22.next = 11;
                break;

              case 7:
                _context22.prev = 7;
                _context22.t0 = _context22['catch'](1);

                console.log('try { await run(); } catch (e) {}', _context22.t0);
                assert.throws(function () {
                  throw _context22.t0;
                }, /No exception is thrown/);

              case 11:
              case 'end':
                return _context22.stop();
            }
          }
        }, null, this, [[1, 7]]);
      });

      (typeof test === 'function' ? test : it)('description error', function _callee6() {
        return regeneratorRuntime.async(function _callee6$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                error.test = t = function (_ErrorSuite7) {
                  _inherits(DescriptionErrorTest, _ErrorSuite7);

                  function DescriptionErrorTest() {
                    _classCallCheck(this, DescriptionErrorTest);

                    return _possibleConstructorReturn(this, (DescriptionErrorTest.__proto__ || Object.getPrototypeOf(DescriptionErrorTest)).apply(this, arguments));
                  }

                  _createClass(DescriptionErrorTest, [{
                    key: 'operation',
                    value: function operation() {
                      return regeneratorRuntime.async(function operation$(_context23) {
                        while (1) {
                          switch (_context23.prev = _context23.next) {
                            case 0:
                            case 'end':
                              return _context23.stop();
                          }
                        }
                      }, null, this);
                    }
                  }, {
                    key: 'checkpoint',
                    value: function checkpoint() {
                      return regeneratorRuntime.async(function checkpoint$(_context24) {
                        while (1) {
                          switch (_context24.prev = _context24.next) {
                            case 0:
                            case 'end':
                              return _context24.stop();
                          }
                        }
                      }, null, this);
                    }
                  }, {
                    key: 'description',
                    get: function get() {
                      throw new Error('description error');
                    }
                  }]);

                  return DescriptionErrorTest;
                }(ErrorSuite);
                _context25.prev = 1;
                _context25.next = 4;
                return regeneratorRuntime.awrap(new error.leafClasses.DescriptionErrorTest().run());

              case 4:
                assert.isOk(false, 'No exception is thrown');
                _context25.next = 11;
                break;

              case 7:
                _context25.prev = 7;
                _context25.t0 = _context25['catch'](1);

                console.log('try { await run(); } catch (e) {}', _context25.t0);
                assert.throws(function () {
                  throw _context25.t0;
                }, /description error/);

              case 11:
              case 'end':
                return _context25.stop();
            }
          }
        }, null, this, [[1, 7]]);
      });
    });

    (typeof suite === 'function' ? suite : describe)('Suite error test', function () {
      (typeof test === 'function' ? test : it)('Suite description error', function _callee7() {
        var error3;
        return regeneratorRuntime.async(function _callee7$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                error3 = new Suite('error3');

                Object.defineProperty(error3, 'description', {
                  get: function get() {
                    throw new Error('Suite description error');
                  }
                });
                error3.test = t = function (_Suite2) {
                  _inherits(SuiteDescriptionErrorTest, _Suite2);

                  function SuiteDescriptionErrorTest() {
                    _classCallCheck(this, SuiteDescriptionErrorTest);

                    return _possibleConstructorReturn(this, (SuiteDescriptionErrorTest.__proto__ || Object.getPrototypeOf(SuiteDescriptionErrorTest)).apply(this, arguments));
                  }

                  _createClass(SuiteDescriptionErrorTest, [{
                    key: 'operation',
                    value: function operation() {
                      return regeneratorRuntime.async(function operation$(_context26) {
                        while (1) {
                          switch (_context26.prev = _context26.next) {
                            case 0:
                            case 'end':
                              return _context26.stop();
                          }
                        }
                      }, null, this);
                    }
                  }, {
                    key: 'checkpoint',
                    value: function checkpoint() {
                      return regeneratorRuntime.async(function checkpoint$(_context27) {
                        while (1) {
                          switch (_context27.prev = _context27.next) {
                            case 0:
                            case 'end':
                              return _context27.stop();
                          }
                        }
                      }, null, this);
                    }
                  }]);

                  return SuiteDescriptionErrorTest;
                }(Suite);
                _context28.prev = 3;
                _context28.next = 6;
                return regeneratorRuntime.awrap(error3.run(0, '#target'));

              case 6:
                assert.isOk(false, 'No exception is thrown');
                _context28.next = 13;
                break;

              case 9:
                _context28.prev = 9;
                _context28.t0 = _context28['catch'](3);

                console.log('try { await run(); } catch (e) {}', _context28.t0);
                assert.throws(function () {
                  throw _context28.t0;
                }, /Suite description error/);

              case 13:
              case 'end':
                return _context28.stop();
            }
          }
        }, null, this, [[3, 9]]);
      });

      (typeof test === 'function' ? test : it)('Suite description error 2', function _callee8() {
        var error3;
        return regeneratorRuntime.async(function _callee8$(_context31) {
          while (1) {
            switch (_context31.prev = _context31.next) {
              case 0:
                error3 = new Suite('error3.2');

                Object.defineProperty(error3, 'description', {
                  get: function get() {
                    return '';
                  }
                });
                error3.test = t = function (_Suite3) {
                  _inherits(SuiteDescriptionErrorTest, _Suite3);

                  function SuiteDescriptionErrorTest() {
                    _classCallCheck(this, SuiteDescriptionErrorTest);

                    return _possibleConstructorReturn(this, (SuiteDescriptionErrorTest.__proto__ || Object.getPrototypeOf(SuiteDescriptionErrorTest)).apply(this, arguments));
                  }

                  _createClass(SuiteDescriptionErrorTest, [{
                    key: 'operation',
                    value: function operation() {
                      return regeneratorRuntime.async(function operation$(_context29) {
                        while (1) {
                          switch (_context29.prev = _context29.next) {
                            case 0:
                            case 'end':
                              return _context29.stop();
                          }
                        }
                      }, null, this);
                    }
                  }, {
                    key: 'checkpoint',
                    value: function checkpoint() {
                      return regeneratorRuntime.async(function checkpoint$(_context30) {
                        while (1) {
                          switch (_context30.prev = _context30.next) {
                            case 0:
                            case 'end':
                              return _context30.stop();
                          }
                        }
                      }, null, this);
                    }
                  }]);

                  return SuiteDescriptionErrorTest;
                }(Suite);
                _context31.prev = 3;
                _context31.next = 6;
                return regeneratorRuntime.awrap(error3.run(0, '#target'));

              case 6:
                assert.isOk(true, 'No exception is thrown');
                _context31.next = 13;
                break;

              case 9:
                _context31.prev = 9;
                _context31.t0 = _context31['catch'](3);

                console.log('try { await run(); } catch (e) {}', _context31.t0);
                throw _context31.t0;

              case 13:
              case 'end':
                return _context31.stop();
            }
          }
        }, null, this, [[3, 9]]);
      });

      (typeof test === 'function' ? test : it)('Suite runner description error', function _callee9() {
        var error4;
        return regeneratorRuntime.async(function _callee9$(_context34) {
          while (1) {
            switch (_context34.prev = _context34.next) {
              case 0:
                error4 = new Suite('error4');

                error4.test = t = function (_Suite4) {
                  _inherits(RunnerDescriptionErrorTest, _Suite4);

                  function RunnerDescriptionErrorTest() {
                    _classCallCheck(this, RunnerDescriptionErrorTest);

                    return _possibleConstructorReturn(this, (RunnerDescriptionErrorTest.__proto__ || Object.getPrototypeOf(RunnerDescriptionErrorTest)).apply(this, arguments));
                  }

                  _createClass(RunnerDescriptionErrorTest, [{
                    key: 'operation',
                    value: function operation() {
                      return regeneratorRuntime.async(function operation$(_context32) {
                        while (1) {
                          switch (_context32.prev = _context32.next) {
                            case 0:
                            case 'end':
                              return _context32.stop();
                          }
                        }
                      }, null, this);
                    }
                  }, {
                    key: 'checkpoint',
                    value: function checkpoint() {
                      return regeneratorRuntime.async(function checkpoint$(_context33) {
                        while (1) {
                          switch (_context33.prev = _context33.next) {
                            case 0:
                            case 'end':
                              return _context33.stop();
                          }
                        }
                      }, null, this);
                    }
                  }, {
                    key: 'description',
                    get: function get() {
                      throw new Error('runner description error');
                    }
                  }]);

                  return RunnerDescriptionErrorTest;
                }(Suite);
                _context34.prev = 2;
                _context34.next = 5;
                return regeneratorRuntime.awrap(error4.run(0, '#target'));

              case 5:
                assert.isOk(false, 'No exception is thrown');
                _context34.next = 14;
                break;

              case 8:
                _context34.prev = 8;
                _context34.t0 = _context34['catch'](2);

                console.log('try { await run(); } catch (e) {}', _context34.t0);
                assert.isArray(_context34.t0.errors);
                assert.equal(_context34.t0.errors[0][2].message, 'runner description error');
                assert.throws(function () {
                  throw _context34.t0;
                }, /Suite[.]error4[.]run\(RunnerDescriptionErrorTest\): exception\(s\) thrown. See .errors for details/);

              case 14:
              case 'end':
                return _context34.stop();
            }
          }
        }, null, this, [[2, 8]]);
      });

      (typeof test === 'function' ? test : it)('Suite runner iteration error', function _callee10() {
        var error5;
        return regeneratorRuntime.async(function _callee10$(_context49) {
          while (1) {
            switch (_context49.prev = _context49.next) {
              case 0:
                error5 = new Suite('error5');

                error5.test = t = function (_Suite5) {
                  _inherits(RunnerIterationErrorTest, _Suite5);

                  function RunnerIterationErrorTest() {
                    _classCallCheck(this, RunnerIterationErrorTest);

                    return _possibleConstructorReturn(this, (RunnerIterationErrorTest.__proto__ || Object.getPrototypeOf(RunnerIterationErrorTest)).apply(this, arguments));
                  }

                  _createClass(RunnerIterationErrorTest, [{
                    key: 'iteration',
                    value: regeneratorRuntime.mark(function iteration() {
                      return regeneratorRuntime.wrap(function iteration$(_context35) {
                        while (1) {
                          switch (_context35.prev = _context35.next) {
                            case 0:
                              return _context35.delegateYield([1, 2, 3, 4, 5], 't0', 1);

                            case 1:
                            case 'end':
                              return _context35.stop();
                          }
                        }
                      }, iteration, this);
                    })
                  }, {
                    key: 'operation',
                    value: function operation() {
                      return regeneratorRuntime.async(function operation$(_context36) {
                        while (1) {
                          switch (_context36.prev = _context36.next) {
                            case 0:
                            case 'end':
                              return _context36.stop();
                          }
                        }
                      }, null, this);
                    }
                  }, {
                    key: 'checkpoint',
                    value: function checkpoint() {
                      return regeneratorRuntime.async(function checkpoint$(_context37) {
                        while (1) {
                          switch (_context37.prev = _context37.next) {
                            case 0:
                            case 'end':
                              return _context37.stop();
                          }
                        }
                      }, null, this);
                    }
                  }, {
                    key: 'exception',
                    value: function exception(reject, _exception3) {
                      // Handle exception by mocha
                      //(typeof test === 'function' ? test : it)('Exception on scenario', function() { throw exception; });
                      console.log('rejecting ', _exception3.message);
                      reject(_exception3);
                      return true;
                    }
                  }]);

                  return RunnerIterationErrorTest;
                }(Suite);
                error5.test = t = function (_Suite6) {
                  _inherits(RunnerIterationErrorTest2, _Suite6);

                  function RunnerIterationErrorTest2() {
                    _classCallCheck(this, RunnerIterationErrorTest2);

                    return _possibleConstructorReturn(this, (RunnerIterationErrorTest2.__proto__ || Object.getPrototypeOf(RunnerIterationErrorTest2)).apply(this, arguments));
                  }

                  _createClass(RunnerIterationErrorTest2, [{
                    key: 'operation',
                    value: function operation() {
                      return regeneratorRuntime.async(function operation$(_context38) {
                        while (1) {
                          switch (_context38.prev = _context38.next) {
                            case 0:
                            case 'end':
                              return _context38.stop();
                          }
                        }
                      }, null, this);
                    }
                  }, {
                    key: 'checkpoint',
                    value: function checkpoint() {
                      return regeneratorRuntime.async(function checkpoint$(_context39) {
                        while (1) {
                          switch (_context39.prev = _context39.next) {
                            case 0:
                            case 'end':
                              return _context39.stop();
                          }
                        }
                      }, null, this);
                    }
                  }, {
                    key: 'exception',
                    value: function exception(reject, _exception4) {
                      reject(_exception4);
                      return true;
                    }
                  }]);

                  return RunnerIterationErrorTest2;
                }(Suite);
                error5.test = t = function (_error5$classes$Runne) {
                  _inherits(RunnerIterationErrorTest3, _error5$classes$Runne);

                  function RunnerIterationErrorTest3() {
                    _classCallCheck(this, RunnerIterationErrorTest3);

                    return _possibleConstructorReturn(this, (RunnerIterationErrorTest3.__proto__ || Object.getPrototypeOf(RunnerIterationErrorTest3)).apply(this, arguments));
                  }

                  _createClass(RunnerIterationErrorTest3, [{
                    key: 'iteration',
                    value: regeneratorRuntime.mark(function iteration() {
                      return regeneratorRuntime.wrap(function iteration$(_context40) {
                        while (1) {
                          switch (_context40.prev = _context40.next) {
                            case 0:
                              _context40.next = 2;
                              return 1;

                            case 2:
                              _context40.next = 4;
                              return 2;

                            case 4:
                              _context40.next = 6;
                              return 3;

                            case 6:
                              _context40.next = 8;
                              return 4;

                            case 8:
                              throw new Error('runner iteration error 1');

                            case 9:
                            case 'end':
                              return _context40.stop();
                          }
                        }
                      }, iteration, this);
                    })
                  }, {
                    key: 'operation',
                    value: function operation() {
                      return regeneratorRuntime.async(function operation$(_context41) {
                        while (1) {
                          switch (_context41.prev = _context41.next) {
                            case 0:
                            case 'end':
                              return _context41.stop();
                          }
                        }
                      }, null, this);
                    }
                  }, {
                    key: 'checkpoint',
                    value: function checkpoint() {
                      return regeneratorRuntime.async(function checkpoint$(_context42) {
                        while (1) {
                          switch (_context42.prev = _context42.next) {
                            case 0:
                            case 'end':
                              return _context42.stop();
                          }
                        }
                      }, null, this);
                    }
                  }]);

                  return RunnerIterationErrorTest3;
                }(error5.classes.RunnerIterationErrorTest);
                error5.test = t = function (_Suite7) {
                  _inherits(RunnerIterationErrorTest4, _Suite7);

                  function RunnerIterationErrorTest4() {
                    _classCallCheck(this, RunnerIterationErrorTest4);

                    return _possibleConstructorReturn(this, (RunnerIterationErrorTest4.__proto__ || Object.getPrototypeOf(RunnerIterationErrorTest4)).apply(this, arguments));
                  }

                  _createClass(RunnerIterationErrorTest4, [{
                    key: 'iteration',
                    value: regeneratorRuntime.mark(function iteration() {
                      return regeneratorRuntime.wrap(function iteration$(_context43) {
                        while (1) {
                          switch (_context43.prev = _context43.next) {
                            case 0:
                              return _context43.delegateYield([1, 2, 3, 4, 5].map(function (i) {
                                return { name: 'iteration error ' + i };
                              }), 't0', 1);

                            case 1:
                            case 'end':
                              return _context43.stop();
                          }
                        }
                      }, iteration, this);
                    })
                  }, {
                    key: 'operation',
                    value: function operation() {
                      return regeneratorRuntime.async(function operation$(_context44) {
                        while (1) {
                          switch (_context44.prev = _context44.next) {
                            case 0:
                            case 'end':
                              return _context44.stop();
                          }
                        }
                      }, null, this);
                    }
                  }, {
                    key: 'checkpoint',
                    value: function checkpoint() {
                      return regeneratorRuntime.async(function checkpoint$(_context45) {
                        while (1) {
                          switch (_context45.prev = _context45.next) {
                            case 0:
                            case 'end':
                              return _context45.stop();
                          }
                        }
                      }, null, this);
                    }
                  }]);

                  return RunnerIterationErrorTest4;
                }(Suite);
                error5.test = t = function (_error5$classes$Runne2) {
                  _inherits(RunnerIterationErrorTest5, _error5$classes$Runne2);

                  function RunnerIterationErrorTest5() {
                    _classCallCheck(this, RunnerIterationErrorTest5);

                    return _possibleConstructorReturn(this, (RunnerIterationErrorTest5.__proto__ || Object.getPrototypeOf(RunnerIterationErrorTest5)).apply(this, arguments));
                  }

                  _createClass(RunnerIterationErrorTest5, [{
                    key: 'iteration',
                    value: regeneratorRuntime.mark(function iteration() {
                      return regeneratorRuntime.wrap(function iteration$(_context46) {
                        while (1) {
                          switch (_context46.prev = _context46.next) {
                            case 0:
                              _context46.next = 2;
                              return 1;

                            case 2:
                              _context46.next = 4;
                              return 2;

                            case 4:
                              _context46.next = 6;
                              return 3;

                            case 6:
                              _context46.next = 8;
                              return 4;

                            case 8:
                              throw new Error('runner iteration error 2');

                            case 9:
                            case 'end':
                              return _context46.stop();
                          }
                        }
                      }, iteration, this);
                    })
                  }, {
                    key: 'operation',
                    value: function operation() {
                      return regeneratorRuntime.async(function operation$(_context47) {
                        while (1) {
                          switch (_context47.prev = _context47.next) {
                            case 0:
                            case 'end':
                              return _context47.stop();
                          }
                        }
                      }, null, this);
                    }
                  }, {
                    key: 'checkpoint',
                    value: function checkpoint() {
                      return regeneratorRuntime.async(function checkpoint$(_context48) {
                        while (1) {
                          switch (_context48.prev = _context48.next) {
                            case 0:
                            case 'end':
                              return _context48.stop();
                          }
                        }
                      }, null, this);
                    }
                  }]);

                  return RunnerIterationErrorTest5;
                }(error5.classes.RunnerIterationErrorTest);
                _context49.prev = 6;
                _context49.next = 9;
                return regeneratorRuntime.awrap(error5.run(0, '#target'));

              case 9:
                assert.isOk(false, 'No exception is thrown');
                _context49.next = 20;
                break;

              case 12:
                _context49.prev = 12;
                _context49.t0 = _context49['catch'](6);

                console.log(error5.test);
                console.log('try { await run(); } catch (e) {}', _context49.t0.constructor.name, _context49.t0, _context49.t0.errors);
                assert.isArray(_context49.t0.errors);
                assert.equal(_context49.t0.errors[1][2].message, 'runner iteration error 1');
                assert.equal(_context49.t0.errors[3][2].message, 'runner iteration error 2');
                assert.throws(function () {
                  throw _context49.t0;
                }, /Suite[.]error5[.]run\(RunnerIterationErrorTest2,RunnerIterationErrorTest3,RunnerIterationErrorTest4,RunnerIterationErrorTest5\)/);

              case 20:
              case 'end':
                return _context49.stop();
            }
          }
        }, null, this, [[6, 12]]);
      });
    });
  }
} // error scope