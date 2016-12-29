'use strict';

//require('babel-polyfill');
const chai = require('chai');
global.assert = chai.assert;
global.Suite = require('../../Suite.js');
Suite.debug = true;
require('./example.js');
require('./example2.js');
require('./error.js');
