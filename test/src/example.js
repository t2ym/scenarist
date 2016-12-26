'use strict';
// global test classes
class ExampleSuite extends Suite {
  async setup() {
    await super.setup();
  }
  async teardown() {
    await super.teardown();
  }
}
{
  // example scope
  let scope = 'example';
  let example = new Suite(scope, 'Description of Example Suite');
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
    async operation() {
      //console.log('Test 2 operation');
    }
    async checkpoint() {
      //console.log('Checkpoint for Test 2');
    }
  }
  example.test = class TestC extends ExampleSuite {
    async operation() {
      //console.log('Test C operation');
    }
    async checkpoint() {
      //console.log('Checkpoint for Test C');
    }
  }
  example.test = class TestD extends ExampleSuite {
    async operation() {
      //console.log('Test D operation');
    }
    async checkpoint() {
      //console.log('Checkpoint for Test D');
    }
  }
  example.test = class TestE extends ExampleSuite {
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
          Test1: ''
        },
        TestAB3: 'TestEAB3; Description of "Test EAB3"'
      },
      Suite.permute([ 'TestA', 'TestB', 'Test1' ], (scenario) => ({
        Test2: 'Test_E_' + scenario.map(n => n.replace(/^Test/,'')).join('_') + '_2'
      }))
    ]
  };

  //let match = decodeURIComponent(window.location.href).match(/^.*[^_a-zA-Z0-9]TestSuites=([_a-zA-Z0-9,]*).*$/);
  //window.testSuites = window.testSuites || {};

  //if (match) {
    // Runner
    example.run(0, '#example');
  //}
  //else {
    // Driver
    //testSuites[scope] = Suite.scopes[scope].test;
  //}
} // example scope
