# service



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org

egg.js post 提交会默认有安全防攻击
csrf 跨站请求伪造
取消 config security: false

password 加密
存储密码时，存储加密过后
登陆，使用用户输入的密码和同样的加密方式，将两个加密后的字符串进行比较
crypto 通用的加密和哈希算法， Hmac sha256

json web token jwt 是一个非常轻巧的规范，允许我们在用户和服务之间传递安全可靠的信息

状态码 status code
400 请求非法，导致服务器不接收请求
401 未经过授权，被服务器配置拒绝
