const getFaces = require('./getFaces');
const overlayChristosOnFace = require('./overlayChristosOnFace');
const overlayChristosOnEdge = require('./overlayChristosOnEdge');

module.exports = async (buffer, mimeType) => {
  const faces = await getFaces(buffer);

  if (!faces) {
    return Promise.reject('Could not open buffer');
  }

  if (faces.length) {
    for (let i in faces) {
      buffer = await overlayChristosOnFace(faces[i], buffer, mimeType);
    }
  } else {
    buffer = await overlayChristosOnEdge(buffer, mimeType);
  }

  return Promise.resolve(buffer);
};
