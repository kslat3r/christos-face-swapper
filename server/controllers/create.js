const fs = require('async-file');
const mongoose = require('mongoose');
const FaceSwap = mongoose.model('FaceSwap');

module.exports = {
  get: async (ctx, next) => {
    await ctx.render('create', {
      title: 'Create a Christos faceswap'
    });

    await next;
  },

  post: async (ctx, next) => {
    let error;

    // do we have an upload?

    if (ctx.request.body.files && ctx.request.body.files.image) {
      // read file into memory

      const file = ctx.request.body.files.image;
      const filePath = file.path;
      const fileMimeType = file.type;
      const fileContents = await fs.readFile(filePath);

      // delete file

      await fs.unlink(filePath);
    } else {
      error = 'Missing image upload';
    }

    // show error page or redirect to faceswap

    if (error) {
      await ctx.render('create', {
        title: 'Create a Christos faceswap',
        flashMessages: [{
          type: 'danger',
          message: error,
        }],
      });
    } else {
      await ctx.redirect(`/faceswap/${NewFaceSwap._id}`);
    }

    await next;
  },
};
