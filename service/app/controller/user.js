'use strict';
const Controller = require('egg').Controller;

class UserController extends Controller {
  async userInfo() {
    const { ctx } = this;
    const userId = ctx.query.userId || ctx.user.userId;
    const user = await this.service.user.getUserByUserId(userId);
    const userInfo = {
      username: user.username,
      email: user.email,
      avatarUrl: user.avatarUrl,
      abstract: user.abstract,
      account: user.email.replace(/@.*/, ''),
      sex: user.sex,
      userId: user.userId,
    };
    ctx.returnBody(200, '登陆成功', userInfo);
  }
}

module.exports = UserController;
