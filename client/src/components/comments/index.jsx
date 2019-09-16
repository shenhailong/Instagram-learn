import React, { Component } from 'react';
import Style from './index.scss';
import API from '@common/api.js';
import { notification } from 'antd';
import { connect } from 'react-redux';
@connect(store => {
  return {
    userInfo: store.userInfo
  }
}, dispatch => {
  return {}
})
class Comments extends Component {
  constructor(props){
    super(props)
    this.state = {
      replyContent: ''
    }
  }

  handleChange(event) {
    this.setState({
      replyContent: event.target.value
    })
  }

  async handleKeyPress(event) {
    if(event.key === 'Enter'){
      if(!this.state.replyContent){
        notification.error({
          message: '请输入内容'
        })
        return
      }
      let response = await API.addDiscuss({
        topicId: this.props.topicId,
        replyContent: this.state.replyContent
      })
      notification.success({
        message: '评论成功'
      })
      this.setState({
        replyContent: ''
      })
    }
  }

  async topicLike() {
    let response = await API.topicLike({
      topicId: this.props.topicId,
      status: 1
    })
    notification.success({
      message: '点赞成功'
    })
  }

  render() {
    return (
      <div className={Style['comments-section']}>
        <div className="opetions">
          <div className="fl-left">
            <span onClick={this.topicLike.bind(this)} className="favorite"></span>
            <span className="comments"></span>
          </div>
        </div>
        <div className="add-comments">
          <input
            onKeyPress={this.handleKeyPress.bind(this)}
            onChange={this.handleChange.bind(this)} 
            value={this.state.replyContent} 
            placeholder="添加评论" 
            type="text" 
            ref="textInput" 
            className="u-f-black"/>
        </div>
      </div>
    )
  }
};

export default Comments;
