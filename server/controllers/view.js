module.exports = {
  get: async (ctx, next) => {
    await ctx.render('view', {
      title: 'View a Christos faceswap'
    });

    await next;
  }
};
