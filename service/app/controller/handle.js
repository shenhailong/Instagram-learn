'use strict';

const Controller = require('egg').Controller;

class HandleController extends Controller {
  async getQiniuToken() {
    const { ctx } = this;
    const token = await ctx.service.qiniu.getQiniuToken();
    ctx.returnBody(200, '获取token成功 ', {
      token,
      baseUrl: 'http://pxwu284rw.bkt.clouddn.com',
    });
  }
}

module.exports = HandleController;
