const Promise = require('bluebird');
const jimp = require('jimp');
const christosPath = `${__dirname}/../assets/christos.png`;

module.exports = async (face, buffer, mimeType) => {
  const image = await jimp.read(buffer);
  const christos = await jimp.read(christosPath);

  // get vars

  const enlargeAmount = 30;
  const x = face.getX() - (enlargeAmount / 2);
  const y = face.getY() - (enlargeAmount / 2);
  const width = face.getWidth() + enlargeAmount;
  const height = face.getHeight() + enlargeAmount;

  const overlay = await new jimp(width, height, 0xFF0000FF);

  // resize christos

  christos.contain(width, height);

  // add to image

  // image.composite(overlay, x, y);
  image.composite(christos, x, y);

  // return buffer

  return await Promise.promisify(image.getBuffer).call(image, mimeType);
};
