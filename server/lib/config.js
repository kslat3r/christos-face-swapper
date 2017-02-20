'use strict';

const nconf = require('nconf');

nconf.argv()
  .env()
  .file('common', {
    file: process.env.NODE_ENV === undefined ? `${__dirname}/../development.json` : `${__dirname}/../${process.env.NODE_ENV}.json`,
  });

module.exports = nconf;
