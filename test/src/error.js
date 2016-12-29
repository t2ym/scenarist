'use strict';
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
  let scope = 'error';
  let error = new Suite(scope, 'Description of Error Suite');
  let t; // temporary variable as a workaround for Edge 15.14986 issue #12
  let isIndexHtml = false;

  error.test = t = class DummyTest extends ErrorSuite {}

  if (typeof window === 'object' &&
      !decodeURIComponent(window.location.href).match(/^.*[^_a-zA-Z0-9]TestSuites=([_a-zA-Z0-9,]*).*$/)) {
    isIndexHtml = true;
  }

  if (!isIndexHtml) {
    (typeof suite === 'function' ? suite : describe)('Suite error test', function () {
      (typeof suite === 'function' ? suite : describe)('.test setter error test', function () {
        (typeof test === 'function' ? test : it)('duplicate class names', function () {
          assert.throws(function () {
            error.test = t = class DuplicateClass extends ErrorSuite {}
            error.test = t = class DuplicateClass extends ErrorSuite {}
          }, /Suite[.]error: class DuplicateClass already exists/);
        });

        (typeof test === 'function' ? test : it)('duplicate class mixin names', function () {
          assert.throws(function () {
            error.test = (base) => class DuplicateMixin extends base {}
            error.test = (base) => class DuplicateMixin extends base {}
          }, /Suite[.]error: class mixin DuplicateMixin already exists/);
        });

        (typeof test === 'function' ? test : it)('no class mixin name', function () {
          assert.throws(function () {
            error.test = (base) => class extends base {}
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
            error.test = (base) => class DuplicateMixinBase extends base {}
            error.test = { 
              '': [
                {
                  DuplicateMixinBase: 'DuplicateMixin'
                },
                {
                  DuplicateMixinBase: 'DuplicateMixin'
                }
              ]
            };
          }, /Suite[.]error:generateClass mixin DuplicateMixin already exists/);
        });

        (typeof test === 'function' ? test : it)('duplicate class', function () {
          assert.throws(function () {
            error.test = (base) => class DuplicateMixinBase2 extends base {}
            error.test = { 
              DummyTest: [
                {
                  DuplicateMixinBase2: 'DuplicateClass'
                },
                {
                  DuplicateMixinBase2: 'DuplicateClass'
                }
              ]
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

    (typeof suite === 'function' ? suite : describe)('Scenario test', function () {
      (typeof suite === 'function' ? suite : describe)('skipAfterFailure test', function () {
        (typeof test === 'function' ? test : it)('skipAfterFailure', function () {
          error.test = t = class SkipAfterFailureSuite extends Suite {
            static get skipAfterFailure() { return true; }
            async setup() {
              await super.setup();
              this.__failed = true;
            }
          }
          error.test = (base) => class SkippedTest extends base {
            async operation() {
            }
            async checkpoint() {
              assert.isOk(false, 'SkippedTest must be skipped');
            }
          }
          error.test = {
            SkipAfterFailureSuite: {
              SkippedTest: 'SkipAfterFailureTest'
            }
          }
          console.log(error.leafClasses);
          (new error.leafClasses.SkipAfterFailureTest()).run();
        });

        (typeof test === 'function' ? test : it)('skipAfterFailure with iteration', function () {
          error.test = t = class SkipAfterFailureSuite2 extends Suite {
            static get skipAfterFailure() { return true; }
            async setup() {
              await super.setup();
              this.__failed = true;
            }
          }
          error.test = (base) => class SkippedTest2 extends base {
            * iteration() {
              yield * [ 1, 2, 3 ];
            }
            async operation(parameters) {
            }
            async checkpoint(parameters) {
              assert.isOk(false, 'SkippedTest2 must be skipped');
            }
          }
          error.test = {
            SkipAfterFailureSuite2: {
              SkippedTest2: 'SkipAfterFailureTest2'
            },
            ErrorSuite: 'ErrorSuiteAlias'
          }
          console.log(error.branchScenarios);
          (new error.leafClasses.SkipAfterFailureTest2()).run();
        });

      });
    });
  }
} // error scope
