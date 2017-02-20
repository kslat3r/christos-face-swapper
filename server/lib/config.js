'use strict';

const nconf = require('nconf');

nconf.argv()
  .env()
  .file('common', {
    file: process.env.NODE_ENV === undefined ? `${__dirname}/../config/development.json` : `${__dirname}/../config/${process.env.NODE_ENV}.json`,
  });

module.exports = nconf;
