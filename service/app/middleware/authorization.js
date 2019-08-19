'use strict';
module.exports = (options, app) => {
  return async function(ctx, next) {
    if (app.config.authWhiteList.indexOf(ctx.url) !== -1) {
      await next(options);
      return;
    }
    if (ctx.cookies.get(app.config.auth_cookie_name)) {
      let token = ctx.cookies.get(app.config.auth_cookie_name);
      try {
        ctx.jwt.verity(token, app.config.jwtSecret);
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          token = ctx.jwt.sign(token, app.config.jwtSecret);
        } else {
          ctx.returnBody(401, '不能获取数据');
        }
      }
      await next(options);
    } else {
      ctx.returnBody(401, '不能获取数据1');
      return;
    }
  };
};
