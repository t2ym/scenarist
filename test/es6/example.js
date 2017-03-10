'use strict';
// global test classes
class ExampleSuite extends Suite {
  async setup() {
    await super.setup();
  }
  async teardown() {
    await super.teardown();
  }
  set history(value) {
    this._history = this._history || [];
    this._history.push(value);
  }
  get history() {
    return this._history.join(',');
  }
}
{
  // example scope
  let scope = 'example';
  let example = new Suite(scope, 'Description of Example Suite');
  let t; // temporary variable as a workaround for Edge 15.14986 issue #12
  example.classSyntaxSupport = false;
  example.arrowFunctionSupport = false;
  if (typeof window !== 'object') {
    Suite._createClass = function () {};
  }
  example.test = (base) => class TestA extends base {
    get description() { return 'Description of Test A'; }
    async operation() {
      //console.log('Test A operation');
      this.history = 'A';
    }
    async checkpoint() {
      //console.log('Checkpoint for Test A');
      //assert.isOk(false, 'Failing test A');
      assert.isOk(example.expected[Suite._name(this.constructor)].indexOf(this.history) === 0, 'History ' + this.history + ' is valid');
    }
  }
  example.test = (base) => class TestB extends base {
    async operation() {
      //console.log('Test B operation');
      this.history = 'B';
    }
    async checkpoint() {
      //console.log('Checkpoint for Test B');
      assert.isOk(example.expected[Suite._name(this.constructor)].indexOf(this.history) === 0, 'History ' + this.history + ' is valid');
    }
  }
  example.test = (base) => class Test1 extends base {
    async operation() {
      //console.log('Test 1 operation');
      this.history = '1';
    }
    async checkpoint() {
      //console.log('Checkpoint for Test 1');
      assert.isOk(example.expected[Suite._name(this.constructor)].indexOf(this.history) === 0, 'History ' + this.history + ' is valid');
    }
  }
  example.test = (base) => class Test2 extends base {
    async operation() {
      //console.log('Test 2 operation');
      this.history = '2';
      if (typeof window === 'object') {
        let element = document.querySelector(this.target);
        let child = element.querySelector('div');
        await this.forEvent(element, 'click', () => element.click(), (element, type, event) => type === 'click');
        setTimeout(() => element.click(), 100);
        setTimeout(() => child.click(), 50);
        await this.forEvent(element, 'click', null, true);
        setTimeout(() => element.click(), 100);
        await this.forEvent(element, 'click', null, false);
      }
    }
    async checkpoint() {
      //console.log('Checkpoint for Test 2');
      assert.isOk(example.expected[Suite._name(this.constructor)].indexOf(this.history) === 0, 'History ' + this.history + ' is valid');
    }
  }
  example.test = t = class TestC extends ExampleSuite {
    async operation() {
      //console.log('Test C operation');
      this.history = 'C';
    }
    async checkpoint() {
      //console.log('Checkpoint for Test C');
      assert.isOk(example.expected[Suite._name(this.constructor)].indexOf(this.history) === 0, 'History ' + this.history + ' is valid');
    }
  }
  example.test = t = class TestD extends ExampleSuite {
    async operation() {
      //console.log('Test D operation');
      this.history = 'D';
      //console.log('Checkpoint for Test D');
      assert.isOk(example.expected[Suite._name(this.constructor)].indexOf(this.history) === 0, 'History ' + this.history + ' is valid');
    }
    /*
    async checkpoint() {
    }
    */
  }
  example.test = t = class TestE extends ExampleSuite {
    static get skipAfterFailure() { return true; }
    /*
    async operation() {
    }
    */
    async checkpoint() {
      //console.log('Test E operation');
      this.history = 'E';
      //console.log('Checkpoint for Test E');
      assert.isOk(example.expected[Suite._name(this.constructor)].indexOf(this.history) === 0, 'History ' + this.history + ' is valid');
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

  example.expected = {
    "TestCAB": "C,A,B",
    "TestDAlias": "D",
    "TestEAB": "E,A,B",
    "TestEAB12": "E,A,B,1,2",
    "TestEABA": "E,A,B,A",
    "TestEAB3": "E,A,B,A,B,A,B",
    "Test_E_A_B_1_2": "E,A,B,1,2",
    "Test_E_A_1_B_2": "E,A,1,B,2",
    "Test_E_B_A_1_2": "E,B,A,1,2",
    "Test_E_B_1_A_2": "E,B,1,A,2",
    "Test_E_1_B_A_2": "E,1,B,A,2",
    "Test_E_1_A_B_2": "E,1,A,B,2"
  };

  let match = typeof window === 'object'
    ? decodeURIComponent(window.location.href).match(/^.*[^_a-zA-Z0-9]TestSuites=([_a-zA-Z0-9,]*).*$/)
    : false;

  if (typeof window === 'object') {
    // Browser
    if (match) {
      example.run(parseInt(match[1]), '#example');
    }
  }
  else {
    // Node
    for (var i = 0; i < example.test.length; i++)
      example.run(i, '#example');
  }
} // example scope
