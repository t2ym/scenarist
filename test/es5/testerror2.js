'use strict';

require('babel-polyfill');
var chai = require('chai');
global.assert = chai.assert;
global.Suite = require('../../Suite.es5.js');
Suite.debug = true;
require('./error2.js');