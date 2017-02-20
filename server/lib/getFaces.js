const Faced = require('faced');
const faced = new Faced();

module.exports = async (buffer) => {
  return new Promise((resolve) => {
    faced.detect(buffer, (faces) => {
      return resolve(faces);
    });
  });
};
