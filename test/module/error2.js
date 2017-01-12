import Suite from './Suite.js';
Suite.debug = true;
// module scope test classes
class ErrorSuite extends Suite {
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
        let targets = { '0': 'a', '1': 'b', '2': 'c', length: 4 };
        Object.defineProperty(targets, '3', {
          get: function () {
            throw new Error('target item error');
          }
        });
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
        error.test = t = class IterationErrorTest extends ErrorSuite {
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
          await (new error.leafClasses.IterationErrorTest()).run();
          assert.isOk(false, 'No exception is thrown');
        }
        catch (e) {
          console.log('try { await run(); } catch (e) {}', e);
          assert.throws(function () { throw e; }, /iteration error/);
        }
      });

      (typeof test === 'function' ? test : it)('iteration generator name error', async function () {
        error.test = t = class IterationErrorTest2 extends ErrorSuite {
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
          await (new error.leafClasses.IterationErrorTest2()).run();
          assert.isOk(false, 'No exception is thrown');
        }
        catch (e) {
          console.log('try { await run(); } catch (e) {}', e);
          assert.throws(function () { throw e; }, /iteration name error/);
        }
      });
    });

    (typeof suite === 'function' ? suite : describe)('Test scenario error test', function () {
      (typeof test === 'function' ? test : it)('scenario generator error', async function () {
        error.test = t = class ScenarioErrorTest extends ErrorSuite {
          * scenario() {
            throw new Error('scenario error');
          }
          async operation() {
          }
          async checkpoint() {
          }
        }
        try {
          await (new error.leafClasses.ScenarioErrorTest()).run();
          assert.isOk(false, 'No exception is thrown');
        }
        catch (e) {
          console.log('try { await run(); } catch (e) {}', e);
          assert.throws(function () { throw e; }, /scenario error/);
        }
      });

      (typeof test === 'function' ? test : it)('scenario generator error handler', async function () {
        error.test = t = class ScenarioErrorTest2 extends ErrorSuite {
          * scenario() {
            throw new Error('scenario error');
          }
          async operation() {
          }
          async checkpoint() {
          }
          exception(reject, exception) {
            reject(new Error('handled scenario error exception ' + exception.message));
            return true;
          }
        }
        try {
          await (new error.leafClasses.ScenarioErrorTest2()).run();
          assert.isOk(false, 'No exception is thrown');
        }
        catch (e) {
          console.log('try { await run(); } catch (e) {}', e);
          assert.throws(function () { throw e; }, /handled scenario error exception/);
        }
      });

      (typeof test === 'function' ? test : it)('scenario generator error handler 2', async function () {
        error.test = t = class ScenarioErrorTest3 extends ErrorSuite {
          * scenario() {
            throw new Error('scenario error');
          }
          async operation() {
          }
          async checkpoint() {
          }
          exception(reject, exception) {
            // Handle exception by mocha
            //(typeof test === 'function' ? test : it)('Exception on scenario', function() { throw exception; });
          }
        }
        try {
          await (new error.leafClasses.ScenarioErrorTest3()).run();
          assert.isOk(false, 'No exception is thrown');
        }
        catch (e) {
          console.log('try { await run(); } catch (e) {}', e);
          assert.throws(function () { throw e; }, /No exception is thrown/);
        }
      });

      (typeof test === 'function' ? test : it)('description error', async function () {
        error.test = t = class DescriptionErrorTest extends ErrorSuite {
          get description() {
            throw new Error('description error');
          }
          async operation() {
          }
          async checkpoint() {
          }
        }
        try {
          await (new error.leafClasses.DescriptionErrorTest()).run();
          assert.isOk(false, 'No exception is thrown');
        }
        catch (e) {
          console.log('try { await run(); } catch (e) {}', e);
          assert.throws(function () { throw e; }, /description error/);
        }
      });
    });

    (typeof suite === 'function' ? suite : describe)('Suite error test', function () {
      (typeof test === 'function' ? test : it)('Suite description error', async function () {
        let error3 = new Suite('error3');
        Object.defineProperty(error3, 'description', {
          get: function () {
            throw new Error('Suite description error');
          }
        });
        error3.test = t = class SuiteDescriptionErrorTest extends Suite {
          async operation() {
          }
          async checkpoint() {
          }
        }
        try {
          await error3.run(0, '#target');
          assert.isOk(false, 'No exception is thrown');
        }
        catch (e) {
          console.log('try { await run(); } catch (e) {}', e);
          assert.throws(function () { throw e; }, /Suite description error/);
        }
      });

      (typeof test === 'function' ? test : it)('Suite runner description error', async function () {
        let error4 = new Suite('error4');
        error4.test = t = class RunnerDescriptionErrorTest extends Suite {
          get description() {
            throw new Error('runner description error');
          }
          async operation() {
          }
          async checkpoint() {
          }
        }
        try {
          await error4.run(0, '#target');
          assert.isOk(false, 'No exception is thrown');
        }
        catch (e) {
          console.log('try { await run(); } catch (e) {}', e);
          assert.isArray(e.errors);
          assert.equal(e.errors[0][2].message, 'runner description error');
          assert.throws(function () { throw e; }, /Suite[.]error4[.]run\(RunnerDescriptionErrorTest\): exception\(s\) thrown. See .errors for details/);
        }
      });

      (typeof test === 'function' ? test : it)('Suite runner iteration error', async function () {
        let error5 = new Suite('error5');
        error5.test = t = class RunnerIterationErrorTest extends Suite {
          * iteration() {
            yield * [ 1, 2, 3, 4, 5 ];
          }
          async operation() {
          }
          async checkpoint() {
          }
          exception(reject, exception) {
            // Handle exception by mocha
            //(typeof test === 'function' ? test : it)('Exception on scenario', function() { throw exception; });
            console.log('rejecting ', exception.message);
            reject(exception);
            return true;
          }
        }
        error5.test = t = class RunnerIterationErrorTest2 extends Suite {
          async operation() {
          }
          async checkpoint() {
          }
          exception(reject, exception) {
            reject(exception);
            return true;
          }
        }
        error5.test = t = class RunnerIterationErrorTest3 extends error5.classes.RunnerIterationErrorTest {
          * iteration() {
            yield 1;
            yield 2;
            yield 3;
            yield 4;
            throw new Error('runner iteration error 1');
          }
          async operation() {
          }
          async checkpoint() {
          }
        }
        error5.test = t = class RunnerIterationErrorTest4 extends Suite {
          * iteration() {
            yield * [ 1, 2, 3, 4, 5 ].map(i => ({ name: 'iteration error ' + i }));
          }
          async operation() {
          }
          async checkpoint() {
          }
        }
        error5.test = t = class RunnerIterationErrorTest5 extends error5.classes.RunnerIterationErrorTest {
          * iteration() {
            yield 1;
            yield 2;
            yield 3;
            yield 4;
            throw new Error('runner iteration error 2');
          }
          async operation() {
          }
          async checkpoint() {
          }
        }
        try {
          await error5.run(0, '#target');
          assert.isOk(false, 'No exception is thrown');
        }
        catch (e) {
          console.log(error5.test);
          console.log('try { await run(); } catch (e) {}', e.constructor.name, e, e.errors);
          assert.isArray(e.errors);
          assert.equal(e.errors[1][2].message, 'runner iteration error 1');
          assert.equal(e.errors[3][2].message, 'runner iteration error 2');
          assert.throws(function () { throw e; }, /Suite[.]error5[.]run\(RunnerIterationErrorTest2,RunnerIterationErrorTest3,RunnerIterationErrorTest4,RunnerIterationErrorTest5\)/);
        }
      });
    });
  }
} // error scope
