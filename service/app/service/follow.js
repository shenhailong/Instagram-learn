'use strict';
const Service = require('egg').Service;

class FollowService extends Service {
  async followUser(followUser) {
    const { ctx } = this;
    // 先查看有没有关注关系
    const obj = await ctx.model.Follow.findOne({
      where: {
        userId: followUser.userId,
        followedId: ctx.user.userId,
      },
    });
    if (obj) {
      return await obj.update(followUser);
    }
    return await ctx.model.Follow.create(followUser);
  }
}

module.exports = FollowService;
