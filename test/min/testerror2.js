'use strict';

require('babel-polyfill');
var chai = require('chai');
global.assert = chai.assert;
global.Suite = require('../../Suite.min.js');
Suite.debug = true;
require('./error2.js');