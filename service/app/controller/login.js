'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  // 注册
  async register() {
    const { ctx } = this;
    const { password, username, email } = ctx.request.body;
    // ctx.body = `${password} ${username} ${email} `;
    await ctx.service.user.register({ password, username, email });
  }

  // 登陆
  async loginIn() {
    const { ctx } = this;
    const { password, email } = ctx.request.body;
    const token = await ctx.service.user.login({ password, email });
    if (token) {
      const opts = {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7,
        // httpOnly: false,
        // domain: '127.0.0.1',
      };
      ctx.cookies.set(this.config.auth_cookie_name, token, opts);
      ctx.returnBody(200, '登陆成功');
    } else {
      ctx.throw(400, '用户名或密码错误');
    }
  }
}

module.exports = LoginController;
