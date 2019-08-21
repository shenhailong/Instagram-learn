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

}

module.exports = TopicController;
