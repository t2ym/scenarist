'use strict';
/*
//require('babel-polyfill');
const chai = require('chai');
const assert = chai.assert;
const Suite = require('../../Suite.es6.js');
Suite.debug = true;
*/
// global test classes
(typeof window === 'object' ? window : global).ErrorSuite = class ErrorSuite extends Suite {
  async setup() {
    await super.setup();
  }
  async teardown() {
    await super.teardown();
  }
}
{
  // error scope
  let scope = 'error2';
  let error = new Suite(scope, 'Description of Error Suite');
  let t; // temporary variable as a workaround for Edge 15.14986 issue #12
  let isIndexHtml = false;

  error.test = t = class DummyTest extends ErrorSuite {}

  if (typeof window === 'object' &&
      !decodeURIComponent(window.location.href).match(/^.*[^_a-zA-Z0-9]TestSuites=([_a-zA-Z0-9,]*).*$/)) {
    isIndexHtml = true;
  }

  if (!isIndexHtml) {
    (typeof suite === 'function' ? suite : describe)('Suite utilities error test', function () {
      (typeof test === 'function' ? test : it)('Suite.permute error', function () {
        assert.throws(function () {
          Suite.permute(null, () => 'a');
        }, /null/);
      });

      (typeof test === 'function' ? test : it)('Suite.permute length error', function () {
        let count = 0;
        class Targets {
          constructor() {
            this[0] = 'a';
            this[1] = 'b';
          }
          get length() {
            if (count === 0) {
              count++;
              return 2;
            }
            else {
              throw new Error('target length error');
            }
          }
        }
        let targets = new Targets();
        assert.throws(function () {
          try {
            let i = Suite.permute(targets, () => 'a');
          }
          catch (e) {
            //console.log('catching', e);
            throw e;
          }
        }, /target length error/);
      });

      (typeof test === 'function' ? test : it)('Suite.permute item error', function () {
        let targets = { '0': 'a', '1': 'b', '2': 'c', get '3'() { throw new Error('target item error'); }, length: 4 };
        assert.throws(function () {
          try {
            let i = Suite.permute(targets, () => 'a');
          }
          catch (e) {
            //console.log('catching', e);
            throw e;
          }
        }, /target item error/);
      });

      (typeof test === 'function' ? test : it)('Suite.permute item value error', function () {
        let _permute_original = Suite._permute;
        Suite._permute = (function() {
          let obj = {};
          obj[Symbol.iterator] = (function _iterator() {
            var index = 0;
            return {
              next: function() {
                return index < 3 ?
                  { value: index++, done: false } :
                  { get value() {
                      console.log('throwing target item value error');
                      throw new Error('target item value error')
                    },
                    done: false
                  };
              },
              'return': function() {
                console.log('iterator return called');
              }
            }
          });
          return obj;
        }).bind(Suite);
        let targets = [ 1, 2, 3 ];
        assert.throws(function () {
          try {
            Suite.permute(targets, () => 'a');
          }
          catch (e) {
            //console.log('catching', e);
            Suite._permute = _permute_original;
            throw e;
          }
        }, /target item value error/);
      });

      (typeof test === 'function' ? test : it)('Suite.permute recovery check', function () {
        let targets = [ 'a', 'b', 'c' ];
        assert.deepEqual(Suite.permute(targets, (list) => list.join('')),
          {
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
          },
          'Suite.permute is recovered');
      });
    });

    (typeof suite === 'function' ? suite : describe)('Test iteration error test', function () {
      (typeof test === 'function' ? test : it)('iteration generator error', async function () {
        error.test = class IterationErrorTest extends ErrorSuite {
          * iteration() {
            yield 1;
            yield 2;
            throw new Error('iteration error');
          }
          async operation(parameters) {
            console.log('parameter = ' + parameters);
          }
          async checkpoint(parameters) {
          }
        }
        try {
          (new error.leafClasses.IterationErrorTest()).run()
            .catch((e) => console.log(e));
        }
        catch (e) {
          console.log(e);
        }
      });

      (typeof test === 'function' ? test : it)('iteration generator name error', async function () {
        error.test = class IterationErrorTest2 extends ErrorSuite {
          * iteration() {
            yield { name: 'iteration 1', value: '1' }
            yield { name: 'iteration 2', value: '1' }
            yield new class {
              get value() { return 3; }
              get name() { throw new Error('iteration name error'); }
            };
          }
          async operation(parameters) {
            console.log('parameter = ' + parameters);
          }
          async checkpoint(parameters) {
          }
        }
        try {
          (new error.leafClasses.IterationErrorTest2()).run()
            .catch((e) => console.log(e));
        }
        catch (e) {
          console.log(e);
        }
      });
    });

    (typeof suite === 'function' ? suite : describe)('Test scenario error test', function () {
      (typeof test === 'function' ? test : it)('scenario generator error', async function () {
        error.test = class ScenarioErrorTest extends ErrorSuite {
          * scenario() {
            throw new Error('scenario error');
          }
          async operation() {
          }
          async checkpoint() {
          }
        }
        try {
          (new error.leafClasses.ScenarioErrorTest()).run()
            .catch((e) => console.log(e));
        }
        catch (e) {
          console.log(e);
        }
      });
    });

  }
} // error scope
