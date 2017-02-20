module.exports = async (ctx, next) => {
  try {
    await next;

    if (ctx.body === undefined) {
      await ctx.render('errors/pageNotFound');
    }
  } catch (e) {
    if (ctx.status === 404) {
      await ctx.render('errors/pageNotFound');
    }

    if (ctx.status === undefined || ctx.status === 500) {
      await ctx.render('errors/internalServerError', {
        message: err.message,
      });
    }
  }
};
