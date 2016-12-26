'use strict';
// global test classes

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

global.Example2Suite = function (_Suite) {
  _inherits(Example2Suite, _Suite);

  function Example2Suite() {
    _classCallCheck(this, Example2Suite);

    return _possibleConstructorReturn(this, (Example2Suite.__proto__ || Object.getPrototypeOf(Example2Suite)).apply(this, arguments));
  }

  _createClass(Example2Suite, [{
    key: 'setup',
    value: function setup() {
      return regeneratorRuntime.async(function setup$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(_get(Example2Suite.prototype.__proto__ || Object.getPrototypeOf(Example2Suite.prototype), 'setup', this).call(this));

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
              return regeneratorRuntime.awrap(_get(Example2Suite.prototype.__proto__ || Object.getPrototypeOf(Example2Suite.prototype), 'teardown', this).call(this));

            case 2:
            case 'end':
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }], [{
    key: 'reconnectable',
    value: function reconnectable() {
      return false;
    }
  }]);

  return Example2Suite;
}(Suite);
{
  var scope = 'test';
  var target = new Suite(scope, 'test target suite');
}
{
  // example scope
  var _scope = 'example2';
  var example = new Suite(_scope, 'Description of Example 2 Suite');
  example.test = function (base) {
    return function (_base) {
      _inherits(TestA, _base);

      function TestA() {
        _classCallCheck(this, TestA);

        return _possibleConstructorReturn(this, (TestA.__proto__ || Object.getPrototypeOf(TestA)).apply(this, arguments));
      }

      _createClass(TestA, [{
        key: 'operation',
        value: function operation() {
          return regeneratorRuntime.async(function operation$(_context3) {
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
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                case 'end':
                  return _context4.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'description',
        get: function get() {
          return 'Description of Test A';
        }
      }]);

      return TestA;
    }(base);
  };
  example.test = function (base) {
    return function (_base2) {
      _inherits(TestB, _base2);

      function TestB() {
        _classCallCheck(this, TestB);

        return _possibleConstructorReturn(this, (TestB.__proto__ || Object.getPrototypeOf(TestB)).apply(this, arguments));
      }

      _createClass(TestB, [{
        key: 'operation',
        value: function operation() {
          return regeneratorRuntime.async(function operation$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                case 'end':
                  return _context5.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                case 'end':
                  return _context6.stop();
              }
            }
          }, null, this);
        }
      }]);

      return TestB;
    }(base);
  };
  example.test = function (base) {
    return function (_base3) {
      _inherits(Test1, _base3);

      function Test1() {
        _classCallCheck(this, Test1);

        return _possibleConstructorReturn(this, (Test1.__proto__ || Object.getPrototypeOf(Test1)).apply(this, arguments));
      }

      _createClass(Test1, [{
        key: 'operation',
        value: function operation() {
          return regeneratorRuntime.async(function operation$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                case 'end':
                  return _context7.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint() {
          return regeneratorRuntime.async(function checkpoint$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                case 'end':
                  return _context8.stop();
              }
            }
          }, null, this);
        }
      }]);

      return Test1;
    }(base);
  };
  example.test = function (base) {
    return function (_base4) {
      _inherits(Test2, _base4);

      function Test2() {
        _classCallCheck(this, Test2);

        return _possibleConstructorReturn(this, (Test2.__proto__ || Object.getPrototypeOf(Test2)).apply(this, arguments));
      }

      _createClass(Test2, [{
        key: 'iteration',
        value: regeneratorRuntime.mark(function iteration() {
          return regeneratorRuntime.wrap(function iteration$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  return _context9.delegateYield([{ param: 1 }, { param: 2 }, { param: 3 }].map(function (p) {
                    p.name = 'Test 2 ' + p.param;return p;
                  }), 't0', 1);

                case 1:
                case 'end':
                  return _context9.stop();
              }
            }
          }, iteration, this);
        })
      }, {
        key: 'operation',
        value: function operation(parameters) {
          return regeneratorRuntime.async(function operation$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                case 'end':
                  return _context10.stop();
              }
            }
          }, null, this);
        }
      }, {
        key: 'checkpoint',
        value: function checkpoint(parameters) {
          return regeneratorRuntime.async(function checkpoint$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                case 'end':
                  return _context11.stop();
              }
            }
          }, null, this);
        }
      }]);

      return Test2;
    }(base);
  };
  example.test = function (_Suite2) {
    _inherits(TestC, _Suite2);

    function TestC() {
      _classCallCheck(this, TestC);

      return _possibleConstructorReturn(this, (TestC.__proto__ || Object.getPrototypeOf(TestC)).apply(this, arguments));
    }

    _createClass(TestC, [{
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

    return TestC;
  }(Suite);
  example.test = function (_Example2Suite) {
    _inherits(TestD, _Example2Suite);

    function TestD() {
      _classCallCheck(this, TestD);

      return _possibleConstructorReturn(this, (TestD.__proto__ || Object.getPrototypeOf(TestD)).apply(this, arguments));
    }

    _createClass(TestD, [{
      key: 'operation',
      value: function operation() {
        return regeneratorRuntime.async(function operation$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
              case 'end':
                return _context14.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: 'checkpoint',
      value: function checkpoint() {
        return regeneratorRuntime.async(function checkpoint$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
              case 'end':
                return _context15.stop();
            }
          }
        }, null, this);
      }
    }]);

    return TestD;
  }(Example2Suite);
  example.test = function (_Example2Suite2) {
    _inherits(TestE, _Example2Suite2);

    function TestE() {
      _classCallCheck(this, TestE);

      return _possibleConstructorReturn(this, (TestE.__proto__ || Object.getPrototypeOf(TestE)).apply(this, arguments));
    }

    _createClass(TestE, [{
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
    }], [{
      key: 'skipAfterFailure',
      get: function get() {
        return true;
      }
    }]);

    return TestE;
  }(Example2Suite);
  example.test = {
    // test class mixins
    '': [{
      TestA: {
        TestB: 'TestAThenB'
      },
      TestB: {
        TestA: 'TestBThenA'
      }
    }, Suite.repeat('TestAThenB', 3, 'TestAB3')],
    // test classes
    TestC: {
      TestAThenB: 'TestCAB'
    },
    TestD: 'TestDAlias',
    TestE: [{
      TestAThenB: 'TestEAB',
      TestA: {
        TestB: {
          Test1: {
            Test2: 'TestEAB12'
          }
        },
        TestBThenA: 'TestEABA'
      },
      TestB: {
        Test1: null
      },
      TestAB3: 'TestEAB3; Description of "Test EAB3"'
    }, Suite.permute(['TestA', 'TestB', 'Test1'], function (scenario) {
      return {
        Test2: 'Test_E_' + scenario.map(function (n) {
          return n.replace(/^Test/, '');
        }).join('_') + '_2'
      };
    }), {
      TestAB3: Suite.permute(['TestA', 'TestB', 'Test1'])
    }],
    Example2Suite: {
      TestA: ''
    }
  };

  //let match = decodeURIComponent(window.location.href).match(/^.*[^_a-zA-Z0-9]TestSuites=([_a-zA-Z0-9,]*).*$/);
  //window.testSuites = window.testSuites || {};

  //if (match) {
  // Runner
  for (var i = 0; i < example.test.length; i++) {
    example.run(i, '#example2');
  }example.run(['TestCAB']);
  example.run([example.classes.TestCAB]);
  example.run({ TestCAB: example.classes.TestCAB });
  //}
  //else {
  // Driver
  //testSuites[scope] = Suite.scopes[scope].test;
  //}
} // example scope