'use strict';

const config = require('nconf');
const knox = require('knox');
const Promise = require('bluebird');

let instance;

module.exports = () => {
  instance = knox.createClient({
    key: config.get('S3_ACCESS_KEY_ID'),
    secret: config.get('S3_SECRET_ACCESS_KEY'),
    bucket: config.get('S3_BUCKET_NAME'),
    region: config.get('S3_REGION'),
  });

  return {
    create: async (data, name, mimeType) => {
      return new Promise((resolve, reject) => {
        const req = instance.put(name, {
          'x-amz-acl': 'public-read',
          'Content-Length': Buffer.byteLength(data),
          'Content-Type': mimeType,
        });

        req.on('response', (res) => {
          if (res.statusCode === 200) {
            return resolve(req.url);
          }

          return reject(res);
        });

        req.end(data);
      });
    },
  };
};
