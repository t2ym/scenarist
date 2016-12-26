'use strict';

//require('babel-polyfill');
const chai = require('chai');
const assert = chai.assert;
global.Suite = require('../../Suite.js');
Suite.debug = true;
require('./example.js');
require('./example2.js');
