'use strict';
// global test classes
global.Example2Suite = class Example2Suite extends Suite {
  static reconnectable() { return false; }
  async setup() {
    await super.setup();
  }
  async teardown() {
    await super.teardown();
  }
}
{
  let scope = 'test';
  let target = new Suite(scope, 'test target suite');
}
{
  // example scope
  let scope = 'example2';
  let example = new Suite(scope, 'Description of Example 2 Suite');
  example.test = (base) => class TestA extends base {
    get description() { return 'Description of Test A'; }
    async operation() {
      //console.log('Test A operation');
    }
    async checkpoint() {
      //console.log('Checkpoint for Test A');
      //assert.isOk(false, 'Failing test A');
    }
  }
  example.test = (base) => class TestB extends base {
    async operation() {
      //console.log('Test B operation');
    }
    async checkpoint() {
      //console.log('Checkpoint for Test B');
    }
  }
  example.test = (base) => class Test1 extends base {
    async operation() {
      //console.log('Test 1 operation');
    }
    async checkpoint() {
      //console.log('Checkpoint for Test 1');
    }
  }
  example.test = (base) => class Test2 extends base {
    * iteration() {
      yield * [
        { param: 1 },
        { param: 2 },
        { param: 3 }
      ].map((p) => { p.name = 'Test 2 ' + p.param; return p; });
    }
    async operation(parameters) {
      //console.log('Test 2 operation');
    }
    async checkpoint(parameters) {
      //console.log('Checkpoint for Test 2');
    }
  }
  example.test = class TestC extends Suite {
    async operation() {
      //console.log('Test C operation');
    }
    async checkpoint() {
      //console.log('Checkpoint for Test C');
    }
  }
  example.test = class TestD extends Example2Suite {
    async operation() {
      //console.log('Test D operation');
    }
    async checkpoint() {
      //console.log('Checkpoint for Test D');
    }
  }
  example.test = class TestE extends Example2Suite {
    static get skipAfterFailure() { return true; }
    async operation() {
      //console.log('Test D operation');
    }
    async checkpoint() {
      //console.log('Checkpoint for Test D');
    }
  }
  example.test = {
    // test class mixins
    '': [
      {
        TestA: {
          TestB: 'TestAThenB'
        },
        TestB: {
          TestA: 'TestBThenA'
        },
      },
      Suite.repeat('TestAThenB', 3, 'TestAB3')
    ],
    // test classes
    TestC: {
      TestAThenB: 'TestCAB'
    },
    TestD: 'TestDAlias',
    TestE: [
      {
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
      },
      Suite.permute([ 'TestA', 'TestB', 'Test1' ], (scenario) => ({
        Test2: 'Test_E_' + scenario.map(n => n.replace(/^Test/,'')).join('_') + '_2'
      })),
      {
        TestAB3: Suite.permute([ 'TestA', 'TestB', 'Test1' ])
      }
    ],
    Example2Suite: {
      TestA: ''
    }
  };

  //let match = decodeURIComponent(window.location.href).match(/^.*[^_a-zA-Z0-9]TestSuites=([_a-zA-Z0-9,]*).*$/);
  //window.testSuites = window.testSuites || {};

  //if (match) {
    // Runner
    for (var i = 0; i < example.test.length; i++)
      example.run(i, '#example2');
    example.run([ 'TestCAB' ]);
    example.run([ example.classes.TestCAB ]);
    example.run({ TestCAB: example.classes.TestCAB });
  //}
  //else {
    // Driver
    //testSuites[scope] = Suite.scopes[scope].test;
  //}
} // example scope
