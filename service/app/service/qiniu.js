'use strict';
const Service = require('egg').Service;
const qiniu = require('qiniu');
const AccessKey = '-7F1P-t3fU0cMmBVuSIHp17ISntcWQQcLYbAddSw';
const SecretKey = 'dWFQOrO1N80zcISXlKbXBc2_lhuwp8EZw--XiWpn';
const publishBucketDomain = 'http://pxwu284rw.bkt.clouddn.com';
const options = {
  scope: 'dragon-instagram',
  expires: 7200,
};
class QiniuService extends Service {
  async getQiniuToken() {
    if (!AccessKey || !SecretKey || !publishBucketDomain) {
      this.ctx.throw(400, '请配置七牛授权参数');
    }
    const mac = new qiniu.auth.digest.Mac(AccessKey, SecretKey);
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    return uploadToken;
  }
}

module.exports = QiniuService;
