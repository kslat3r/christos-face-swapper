'use strict';

const nconf = require('nconf');

nconf.argv()
  .env();

module.exports = nconf;
