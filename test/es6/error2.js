(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

function __async(g){return new Promise(function(s,j){function c(a,x){try{var r=g[x?"throw":"next"](a);}catch(e){j(e);return}r.done?s(r.value):Promise.resolve(r.value).then(c,d);}function d(e){c(e,1);}c();})}

/*
//require('babel-polyfill');
const chai = require('chai');
const assert = chai.assert;
const Suite = require('../../Suite.js');
Suite.debug = true;
*/
// global test classes
(typeof window === 'object' ? window : global).ErrorSuite = class ErrorSuite extends Suite {
  setup() {return __async(function*($uper){
    yield $uper("setup").call(this);
  }.call(this,p=>super[p]))}
  teardown() {return __async(function*($uper){
    yield $uper("teardown").call(this);
  }.call(this,p=>super[p]))}
};
{
  // error scope
  let scope = 'error2';
  let error = new Suite(scope, 'Description of Error Suite');
  let t; // temporary variable as a workaround for Edge 15.14986 issue #12
  let isIndexHtml = false;

  error.test = t = class DummyTest extends ErrorSuite {};

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
      (typeof test === 'function' ? test : it)('iteration generator error', function () {return __async(function*(){
        error.test = class IterationErrorTest extends ErrorSuite {
          * iteration() {
            yield 1;
            yield 2;
            throw new Error('iteration error');
          }
          operation(parameters) {return __async(function*(){
            console.log('parameter = ' + parameters);
          }())}
          checkpoint(parameters) {return __async(function*(){
          }())}
        };
        try {
          yield (new error.leafClasses.IterationErrorTest()).run();
        }
        catch (e) {
          console.log('try { await run(); } catch (e) {}', e);
          assert.throws(function () { throw e; }, /iteration error/);
        }
      }())});

      (typeof test === 'function' ? test : it)('iteration generator name error', function () {return __async(function*(){
        error.test = class IterationErrorTest2 extends ErrorSuite {
          * iteration() {
            yield { name: 'iteration 1', value: '1' };
            yield { name: 'iteration 2', value: '1' };
            yield new class {
              get value() { return 3; }
              get name() { throw new Error('iteration name error'); }
            };
          }
          operation(parameters) {return __async(function*(){
            console.log('parameter = ' + parameters);
          }())}
          checkpoint(parameters) {return __async(function*(){
          }())}
        };
        try {
          yield (new error.leafClasses.IterationErrorTest2()).run();
        }
        catch (e) {
          console.log('try { await run(); } catch (e) {}', e);
          assert.throws(function () { throw e; }, /iteration name error/);
        }
      }())});
    });

    (typeof suite === 'function' ? suite : describe)('Test scenario error test', function () {
      (typeof test === 'function' ? test : it)('scenario generator error', function () {return __async(function*(){
        error.test = class ScenarioErrorTest extends ErrorSuite {
          * scenario() {
            throw new Error('scenario error');
          }
          operation() {return __async(function*(){
          }())}
          checkpoint() {return __async(function*(){
          }())}
        };
        try {
          yield (new error.leafClasses.ScenarioErrorTest()).run();
        }
        catch (e) {
          console.log('try { await run(); } catch (e) {}', e);
          assert.throws(function () { throw e; }, /scenario error/);
        }
      }())});

      (typeof test === 'function' ? test : it)('description error', function () {return __async(function*(){
        error.test = class DescriptionErrorTest extends ErrorSuite {
          get description() {
            throw new Error('description error');
          }
          operation() {return __async(function*(){
          }())}
          checkpoint() {return __async(function*(){
          }())}
        };
        try {
          yield (new error.leafClasses.DescriptionErrorTest()).run();
        }
        catch (e) {
          console.log('try { await run(); } catch (e) {}', e);
          assert.throws(function () { throw e; }, /description error/);
        }
      }())});
    });

    (typeof suite === 'function' ? suite : describe)('Suite error test', function () {
      (typeof test === 'function' ? test : it)('Suite description error', function () {return __async(function*(){
        let error3 = new Suite('error3');
        Object.defineProperty(error3, 'description', {
          get: function () {
            throw new Error('Suite description error');
          }
        });
        error3.test = class SuiteDescriptionErrorTest extends Suite {
          operation() {return __async(function*(){
          }())}
          checkpoint() {return __async(function*(){
          }())}
        };
        try {
          yield error3.run(0, '#target');
        }
        catch (e) {
          console.log('try { await run(); } catch (e) {}', e);
          assert.throws(function () { throw e; }, /Suite description error/);
        }
      }())});

      (typeof test === 'function' ? test : it)('Suite runner description error', function () {return __async(function*(){
        let error4 = new Suite('error4');
        error4.test = class RunnerDescriptionErrorTest extends Suite {
          get description() {
            throw new Error('runner description error');
          }
          operation() {return __async(function*(){
          }())}
          checkpoint() {return __async(function*(){
          }())}
        };
        try {
          yield error4.run(0, '#target');
        }
        catch (e) {
          console.log('try { await run(); } catch (e) {}', e);
          assert.throws(function () { throw e; }, /runner description error/);
        }
      }())});
    });
  }
} // error scope

})));
