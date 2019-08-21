'use strict';
const Service = require('egg').Service;
const uuid = require('uuid');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
class UserService extends Service {
  async register(user) {
    const { ctx, app } = this;
    user.userId = uuid.v4().replace(/-/g, '');
    const queryResult = await this.hasRegister(user.email);
    if (queryResult) {
      ctx.status = 200;
      ctx.body = {
        msg: '邮箱已经被占用',
        flag: false,
      };
      return;
    }
    // 加密保存用户密码
    user.password = crypto.createHmac('sha256', app.config.password_secret).update(user.password).digest('hex');
    const userInfo = await this.ctx.model.User.create(user);
    ctx.status = 200;
    ctx.body = {
      msg: '注册成功',
      userId: user.userId,
      flag: true,
    };
    return userInfo.dataValues;
  }

  // 查询是否邮箱占用
  async hasRegister(email) {
    const user = await this.ctx.model.User.findOne({
      where: {
        email,
      },
    });
    if (user && user.dataValues.userId) {
      return true;
    }
    return false;
  }

  async login(user) {
    const { app } = this;
    const existUser = await this.getUserByMail(user.email);
    if (!existUser) {
      return null;
    }
    const passhash = existUser.password;
    const equal = passhash === crypto.createHmac('sha256', app.config.password_secret).update(user.password).digest('hex');
    if (!equal) {
      return false;
    }

    const token = jwt.sign({ userId: existUser.userId }, app.config.jwtSecret, { expiresIn: '7d' });
    console.log(token);
    return token;
  }

  async getUserByMail(email) {
    return this.ctx.model.User.findOne({
      where: {
        email,
      },
    });
  }

  async getUserByUserId(userId) {
    return this.ctx.model.User.findOne({
      where: {
        userId,
      },
    });
  }
}

module.exports = UserService;
