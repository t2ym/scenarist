[![npm](https://img.shields.io/npm/v/scenarist.svg)](https://www.npmjs.com/package/scenarist)
[![Bower](https://img.shields.io/bower/v/scenarist.svg)](https://customelements.io/t2ym/scenarist/)

# scenarist

Class-based branching test scenario runner for mocha

```javascript
// common-test.js global test classes
class ExampleSuite extends Suite {
  async setup() {
    await super.setup();
    this.container = document.querySelector(this.target);
  }
  async teardown() {
    let self = this;
    await super.teardown();
    await self.forEvent(self.container, 'dom-change', () => { self.container.if = false; }, true);
  }
}
```

```javascript
// example-test.js
{
  // example scope
  let scope = 'example';
  let example = new Suite(scope, 'Description of Example Suite');
  // test class mixin in "example" scope
  example.test = (base) => class TestA extends base {
    get description() { return 'Description of Test A'; }
    async operation() {
      console.log('Test A operation');
      this.element = document.querySelector('#example')
    }
    async checkpoint() {
      console.log('Checkpoint for Test A');
      assert.equal(this.element.is, 'example-element', 'Element is instantiated');
      //assert.isOk(false, 'Failing test A');
    }
  }
  ...
  // test class in "example" scope
  example.test = class TestE extends ExampleSuite {
    static get skipAfterFailure() { return true; }
    async operation() {}
    async checkpoint() {}
  }
  ...
  // scenarios
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

  let match = decodeURIComponent(window.location.href).match(/^.*[^_a-zA-Z0-9]TestSuites=([_a-zA-Z0-9,]*).*$/);

  if (match) {
    // Runner
    // match[1] = '0' for the first round of test suites runnable without reloading
    example.run(match[1], '#example');
  }
  else {
    // For Driver
    testSuites[scope] = Suite.scopes[scope].test;
  }
} // example scope
```

```javascript
// In Driver page
// example for web-component-tester
var suites = [];
for (var scope in Suite.scopes) {
  Suite.scopes[scope].test.forEach(function (tests, index) {
    suites.push(scope + '-test.html?TestSuites=' + index);
  });
}
WCT.loadSuites(suites);
```

### Design Principles

- Contexts must be explicitly handled in a concise and intuitive way in JavaScript classes
- `suite()` and `test()` in mocha are wrapped for contexts

### Alternative viewpoints for test scenarios with long and branching operations

- Test target systems are a collection of state machines
- Operations for test suites are a series of the branches of states
- Test assertions are targeted "checkpoints" for the expected states

### Depicted test scenarios

```
Initial -(setup op)-> First checkpoint -(op)-> 2nd CP -> ... -> Final CP for scenario A
                                               +--> ... -> Final CP for scenario B 
                                                ...
```

- Initial state is without instances of the target system
- Operations from the initial state set up test fixtures
- The first checkpoint on the first operation asserts the target instances
- Setting up the fixtures may take more steps (operations)
- Successive checkpoints constitute a series of pairs of a (mock) operation and its corresponding test assertion(s)
- Different test suites can share parts of operations and then branch in the latter parts

### Conceptual mappings for JavaScript classes

- Operation: a (mock) operation
- Checkpoint: a collection of test assertions for a checkpoint
- Scenario: a series of Operation and Checkpoint pairs (by a prototype chain of classes)
- Suite: the base class of test scenarios
- Driver: driver of test suites
- Parameters: test parameters handed to constructors of test classes

### Comparison with BDD framework

- "Branching" of test contexts: Shared steps and test assertions for scenarios

## Install

### Browsers

```sh
  bower install --save-dev scenarist
```

### NodeJS

```sh
  npm install --save-dev scenarist
```

## Import

### Browsers

#### Raw ES6 class version

```html
  <script src="path/to/bower_components/scenarist/Suite.js"></script>
```

#### ES5 version

##### Note: `babel-polyfill/browser.js` is required for the ES5 version to work 

```html
  <script src="path/to/node_modules/babel-polyfill/browser.js"></script>
  <script src="path/to/bower_components/scenarist/Suite.min.js"></script>
```

### NodeJS

#### Node 7.x with --harmony_async_await option

##### Command Line
```sh
mocha --harmony_async_await test.js
```

##### Test Script
```javascript
//require('babel-polyfill');
const chai = require('chai');
const assert = chai.assert;
const Suite = require('scenarist/Suite.js');
// test classes...
```

#### Node 4.x - 6.x with Babel es2015 Transpilation

##### Command Line
```sh
mocha test.js
```

##### Test Script
```javascript
require('babel-polyfill');
const chai = require('chai');
const assert = chai.assert;
const Suite = require('scenarist/Suite.min.js');
// test classes...
```

## Compatibility

TBD

- `Suite.js` requires ES6 + async/await (Chrome 55 or later; Node 7.3.0 or later with --harmony_async_await)
- `Suite.min.js` requires ES5 + babel-polyfill (Firefox 50, Safari 10, Edge 14, IE11; Node 4.x or later)

## API

TBD

- `let scope = new Suite('scope', 'Description')`
- `scope.test = class TestClass extends scope.classes.BaseClass {...}`
- `scope.test = (base) => class TestClassMixin extends base {...}`
- `scope.test = {...} // scenario object`
- `scope.run(tests, target)`
- `Suite.repeat('TestClassMixin', count, 'TestClass')`
- `Suite.permute([ 'Test1', 'Test2', 'Test3' ], 'TestClass')`
- `TestClass.skipAfterFailure`
- `TestClass.reconnectable`
- ...

## Complex Examples

### Test Class Mixin with Parameterized Iterations

```javascript
{
  let example = new Suite('example');
  example.test = (base) => class DragDialogTest extends base {
    * iteration() {
      let dx = 10;
      let dy = 10;
      yield *[
        { mode: 'position', dx: dx, dy: dy, expected: { x: dx, y: dy, width: 0, height: 0 } },
        { mode: 'upper-left', dx: -dx, dy: -dy, expected: { x: -dx, y: -dy, width: dx, height: dy } },
        { mode: 'upper', dx: -dx, dy: -dy, expected: { x: 0, y: -dy, width: 0, height: dy } },
        { mode: 'upper-right', dx: dx, dy: -dy, expected: { x: 0, y: -dy, width: dx, height: dy } },
        { mode: 'middle-left', dx: -dx, dy: dy, expected: { x: -dx, y: 0, width: dx, height: 0 } },
        { mode: 'middle-right', dx: dx, dy: dy, expected: { x: 0, y: 0, width: dx, height: 0 } },
        { mode: 'lower-left', dx: -dx, dy: dy, expected: { x: -dx, y: 0, width: dx, height: dy } },
        { mode: 'lower', dx: dx, dy: dy, expected: { x: 0, y: 0, width: 0, height: dy } },
        { mode: 'lower-right', dx: dx, dy: dy, expected: { x: 0, y: 0, width: dx, height: dy } },
        { mode: '.title-pad', dx: dx, dy: dy, expected: { x: 0, y: 0, width: 0, height: 0 } }
      ].map((parameters) => { parameters.name = 'drag dialog by ' + parameters.mode + ' handle'; return parameters });
    }
    async operation(parameters) {
      let self = this;
      let handle = self.dialog.$.handle.querySelector(parameters.mode.match(/^[.]/) ? parameters.mode : '[drag-handle-mode=' + parameters.mode + ']');
      self.origin = {};
      [ 'x', 'y', 'width', 'height' ].forEach(function (prop) {
        self.origin[prop] = self.dialog[prop];
      });
      handle.dispatchEvent(new MouseEvent('mouseover', {
        bubbles: true,
        cancelable: true,
        clientX: 0,
        clientY: 0,
        buttons: 1
      }));
      await self.forEvent(self.dialog, 'track', () => { MockInteractions.track(self.dialog, parameters.dx, parameters.dy); }, (element, type, event) => event.detail.state === 'end');
    }
    async checkpoint(parameters) {
      for (let prop in parameters.expected) {
        assert.equal(
          this.dialog[prop],
          this.origin[prop] + parameters.expected[prop],
          'dialog is dragged with ' + parameters.mode + ' handle by ' + parameters.expected[prop] + ' in ' + prop);
      }
    }
  }
}
```

## License

[BSD-2-Clause](https://github.com/t2ym/scenarist/blob/master/LICENSE.md)
