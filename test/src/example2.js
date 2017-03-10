'use strict';
{
  // example2 scope
  let scope = 'example2';
  let example = new Suite(scope, 'Description of Example 2 Suite');
  let t; // temporary variable as a workaround for Edge 15.14986 issue #12
  example.test = t = class Example2Suite extends Suite {
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
    static get reconnectable() { return false; }
    * iteration() {
      yield * [
        { param: 1 },
        { param: 2 },
        { param: 3 }
      ].map((p) => { p.name = 'Test 2 ' + p.param; return p; });
    }
    /*
    async operation(parameters) {
    }
    */
    async checkpoint(parameters) {
      //console.log('Test 2 operation');
      this.history = '2';
      //console.log('Checkpoint for Test 2');
      assert.isOk(example.expected[Suite._name(this.constructor)].indexOf(this.history) === 0, 'History ' + this.history + ' is valid');
    }
  }
  example.test = t = class TestC extends example.classes.Example2Suite {
    async operation() {
      //console.log('Test C operation');
      this.history = 'C';
    }
    async checkpoint() {
      //console.log('Checkpoint for Test C');
      assert.isOk(example.expected[Suite._name(this.constructor)].indexOf(this.history) === 0, 'History ' + this.history + ' is valid');
    }
  }
  example.test = t = class TestD extends example.classes.Example2Suite {
    async operation() {
      //console.log('Test D operation');
      this.history = 'D';
    }
    async checkpoint() {
      //console.log('Checkpoint for Test D');
      assert.isOk(example.expected[Suite._name(this.constructor)].indexOf(this.history) === 0, 'History ' + this.history + ' is valid');
    }
  }
  example.test = t = class TestE extends example.classes.Example2Suite {
    static get skipAfterFailure() { return true; }
    async operation() {
      //console.log('Test E operation');
      this.history = 'E';
    }
    async checkpoint() {
      //console.log('Checkpoint for Test E');
      assert.isOk(example.expected[Suite._name(this.constructor)].indexOf(this.history) === 0, 'History ' + this.history + ' is valid');
    }
  }
  example.test = t = class TestF extends example.classes.Example2Suite {
    static get reconnectable() { return false; }
    * iteration() {
      yield * [
        { param: 1 },
        { param: 2 },
        { param: 3 }
      ].map((p) => { p.name = (_p) => 'Test F ' + _p.param; return p; });
    }
    async operation(parameters) {
      //console.log('Test F operation');
      this.history = 'F';
      //console.log('Checkpoint for Test F');
      assert.isOk(example.expected[Suite._name(this.constructor)].indexOf(this.history) === 0, 'History ' + this.history + ' is valid');
    }
    /*
    async checkpoint(parameters) {
    }
    */
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
  example.test = {
    TestE: {
      TestA: {
        TestB: ''
      }
    }
  };

  example.expected = {
    "TestCAB": "C,A,B",
    "TestDAlias": "D",
    "TestEAB": "E,A,B",
    "TestEAB12": "E,A,B,1,2,2,2",
    "TestEABA": "E,A,B,A",
    "TestEAB3": "E,A,B,A,B,A,B",
    "Test_E_A_B_1_2": "E,A,B,1,2,2,2",
    "Test_E_A_1_B_2": "E,A,1,B,2,2,2",
    "Test_E_B_A_1_2": "E,B,A,1,2,2,2",
    "Test_E_B_1_A_2": "E,B,1,A,2,2,2",
    "Test_E_1_B_A_2": "E,1,B,A,2,2,2",
    "Test_E_1_A_B_2": "E,1,A,B,2,2,2",
    "TestAThenTestBThenTest1": "E,A,B,A,B,A,B,A,B,1",
    "TestAThenTest1ThenTestB": "E,A,B,A,B,A,B,A,1,B",
    "TestBThenTestAThenTest1": "E,A,B,A,B,A,B,B,A,1",
    "TestBThenTest1ThenTestA": "E,A,B,A,B,A,B,B,1,A",
    "Test1ThenTestBThenTestA": "E,A,B,A,B,A,B,1,B,A",
    "Test1ThenTestAThenTestB": "E,A,B,A,B,A,B,1,A,B",
    "TestA": "A",
    "TestF": "F,F,F"
  };

  let match = typeof window === 'object'
    ? decodeURIComponent(window.location.href).match(/^.*[^_a-zA-Z0-9]TestSuites=([_a-zA-Z0-9,]*).*$/)
    : false;
  let extra = false;

  if (typeof window === 'object') {
    // Browser
    if (match) {
      if (match[1] === 'extra') {
        extra = true;
      }
      else {
        example.run(parseInt(match[1]), '#example2');
      }
    }
  }
  else {
    // Node
    for (var i = 0; i < example.test.length; i++)
      example.run(i, '#example2');
    extra = true;
  }

  if (extra) {
    (typeof suite === 'function' ? suite : describe)('Suite instance test', function () {
      (typeof test === 'function' ? test : it)('check reconnectable test suites', function () {
        assert.deepEqual(example.test, 
          [
            "TestF",
            "TestCAB,TestDAlias,TestEAB",
            "TestEAB12",
            "TestEABA,TestEAB3",
            "Test_E_A_B_1_2",
            "Test_E_A_1_B_2",
            "Test_E_B_A_1_2",
            "Test_E_B_1_A_2",
            "Test_E_1_B_A_2",
            "Test_E_1_A_B_2",
            "TestAThenTestBThenTest1,TestAThenTest1ThenTestB,TestBThenTestAThenTest1,TestBThenTest1ThenTestA,Test1ThenTestBThenTestA,Test1ThenTestAThenTestB,TestA"
          ],
          'reconnectable test suites are properly grouped');
      })
    });
    example.run([ 'TestCAB' ]);
    example.run([ example.classes.TestCAB ]);
    example.run({ TestCAB: example.classes.TestCAB });
  }
} // example2 scope
