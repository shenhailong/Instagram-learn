'use strict';
const jwt = require('jsonwebtoken');

module.exports = {
  get jwt() {
    return jwt;
  },

  // 获取用户身份
  get user() {
    const token = this.cookies.get(this.app.config.auth_cookie_name);
    const user = jwt.verify(token, this.app.config.jwtSecret);
    return user;
  },

  returnBody(status, message, data = {}) {
    this.status = status;
    this.body = {
      data,
      message,
      success: true,
    };
  },
};
