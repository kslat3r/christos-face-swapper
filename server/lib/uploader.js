'use strict';

const config = require('./config');
const knox = require('knox');
const Promise = require('bluebird');

let instance;

module.exports = (Domain) => {
  instance = knox.createClient({
    key: config.get('s3AccessKeyId'),
    secret: config.get('s3SecretAccessKey'),
    bucket: config.get('s3BucketName'),
    region: config.get('s3Region'),
  });

  return {
    create: async (localFilePath, localFileContentType, remoteFilePath) => {
      return new Promise((resolve, reject) => {
        instance.putFile(localFilePath, remoteFilePath, {
          'x-amz-acl': 'public-read',
          'Content-Type': localFileContentType,
        }, (err, res) => {
          if (err) {
            return reject(err);
          }

          return resolve(res);
        });
      });
    },

    delete: async (remoteFilePath) => {
      return new Promise((resolve, reject) => {
        instance.deleteFile(remoteFilePath, (err, res) => {
          if (err) {
            return reject(err);
          }

          return resolve(res);
        });
      });
    },
  };
};
