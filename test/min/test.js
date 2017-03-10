'use strict';

require('babel-polyfill');
var chai = require('chai');
global.assert = chai.assert;
global.Suite = require('../../Suite.min.js');
Suite.debug = false;
require('./example.js');
require('./example2.js');
require('./error.js');
require('./error2.js');