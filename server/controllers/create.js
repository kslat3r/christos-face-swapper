const fs = require('async-file');
const uuid = require('uuid');
const uploader = require('../lib/uploader');
const swapper = require('../lib/swapper');

module.exports = {
  get: async (ctx, next) => {
    await ctx.render('create', {
      title: 'Create a Christos faceswap'
    });

    await next();
  },

  post: async (ctx, next) => {
    let error;

    // do we have an upload?

    if (!ctx.request.body.files || !ctx.request.body.files.image) {
      ctx.throw(500, 'Expected file upload');
    }

    // read file into memory

    const file = ctx.request.body.files.image;
    const path = file.path;
    const mimeType = file.type;
    let data = await fs.readFile(path);

    const uniqId = uuid.v4();
    const extension = file.name.split('.')[1];
    const fileName = `${uniqId}.${extension}`;

    // add christos's face

    try {
      data = await swapper(data, mimeType);
    } catch (e) {
      ctx.throw(500, e.message, { exception: e });
    }

    // create upload

    let url;

    try {
      url = await uploader().create(data, fileName, mimeType);
    } catch (e) {
      ctx.throw(500, e.message, { exception: e });
    }

    // delete file

    await fs.unlink(path);

    // redirect

    ctx.redirect(url);

    await next();
  },
};
