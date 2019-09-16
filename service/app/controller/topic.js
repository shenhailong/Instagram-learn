'use strict';
const Controller = require('egg').Controller;

class TopicController extends Controller {
  async addTopic() {
    const { ctx } = this;
    const { topicImg, topicTitle } = ctx.request.body;
    const userId = ctx.user.userId;
    const newTopic = {
      topicImg: JSON.stringify(topicImg),
      topicTitle,
      userId,
    };

    await this.service.topic.insertTopic(newTopic);
    ctx.returnBody(200, '发图成功');
  }

  async topicDetail() {
    const { ctx } = this;
    const { topicId } = ctx.request.body;
    const topicDetail = await this.service.topic.topicDetailHandler(topicId);
    ctx.returnBody(200, 'ok', topicDetail);
  }

  async friendsTopicList() {
    const { ctx } = this;
    const userId = ctx.user.userId;
    const follower = await ctx.service.follow.findFollow({
      followedId: userId,
      status: 1,
    });
    const followList = follower.map(item => {
      return item.userId;
    });
    followList.push(userId);
    const Op = this.app.Sequelize.Op;
    const topics = await ctx.service.topic.queryTopicList({
      userId: {
        [Op.in]: followList,
      },
    });
    // userInfo
    const topicList = [];
    for (const topic of topics) {
      const item = await ctx.service.topic.topicDetailHandler(topic.topicId);
      topicList.push(item);
    }
    topicList && ctx.returnBody(200, 'ok', topicList);
  }

  async addDiscuss() {
    const { ctx } = this;
    const { topicId, replyContent } = ctx.request.body;
    // discuss userId username 存一个冗余
    const userId = ctx.user.userId;
    const user = await this.service.user.getUserByUserId(userId);
    const newDiscuss = {
      topicId,
      replyContent,
      replyName: user.username,
      userId,
    };
    const discuss = await ctx.service.topic.insertDiscuss(newDiscuss);
    discuss && ctx.returnBody(200, 'ok', discuss);
  }

}

module.exports = TopicController;
