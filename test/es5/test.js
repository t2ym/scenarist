'use strict';

require('babel-polyfill');
var chai = require('chai');
global.assert = chai.assert;
global.Suite = require('../../Suite.es5.js');
Suite.debug = true;
require('./example.js');
require('./example2.js');
require('./error.js');