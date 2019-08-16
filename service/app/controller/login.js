'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async register() {
    const { ctx } = this;
    ctx.body = 'register';
  }
}

module.exports = LoginController;
