const Promise = require('bluebird');
const jimp = require('jimp');
const christosPath = `${__dirname}/../assets/christos.png`;

module.exports = async (buffer, mimeType) => {
  const image = await jimp.read(buffer);
  const christos = await jimp.read(christosPath);

  // rotate

  christos.rotate(-30, jimp.RESIZE_BEZIER);

  // add to image

  const x = image.bitmap.width - 200;
  const y = image.bitmap.height - 200;

  image.composite(christos, x, y);

  // return buffer

  return await Promise.promisify(image.getBuffer).call(image, mimeType);
};
