'use strict';

require('babel-polyfill');
var chai = require('chai');
var assert = chai.assert;
global.Suite = require('../../Suite.min.js');
Suite.debug = true;
require('./example.js');
require('./example2.js');