'use strict';

const config = require('nconf');
const knox = require('knox');
const Promise = require('bluebird');

let instance;

module.exports = () => {
  instance = knox.createClient({
    key: config.get('s3AccessKeyId'),
    secret: config.get('s3SecretAccessKey'),
    bucket: config.get('s3BucketName'),
    region: config.get('s3Region'),
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
