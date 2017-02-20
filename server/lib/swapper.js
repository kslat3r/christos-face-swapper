const getFaces = require('./getFaces');
const overlayChristos = require('./overlayChristos');

module.exports = async (buffer, mimeType) => {
  const faces = await getFaces(buffer);

  if (!faces) {
    return Promise.reject('Could not open %s');
  }

  for (let i in faces) {
    buffer = await overlayChristos(faces[i], buffer, mimeType);
  }

  return Promise.resolve(buffer);
};
