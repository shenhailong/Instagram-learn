/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1565935402504_7894';

  // add your middleware config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '12345678',
    database: 'learn',
  };
  config.password_secret = '123456abc';
  config.auth_cookie_name = 'token';
  config.jwtSecret = 'shenhailong';
  config.authWhiteList = [ '/', '/api/v2', '/api/v2/login', '/api/v2/register' ];
  config.middleware = [ 'authorization' ];
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
