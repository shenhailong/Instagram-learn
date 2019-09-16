import React, { Component } from 'react';
import Style from './index.scss'
import Nav from '@components/nav/index.js';
import Recommend from './components/recommend/index.js';
import API from '@common/api.js';
import update from 'react-addons-update';
import DynamicList from './components/dynamic-list/index.jsx'
import { connect } from 'react-redux';
import PostTopic from './components/post-topic/index.jsx'
@connect(store => {
  return {
    topicList: store.topicList
  }
}, dispatch => {
  return {
    addTopicList: info => {
      dispatch({
        type: 'ADD_TOPIC_LIST',
        info: info
      })
    }
  }
})
class Detail extends Component {
  constructor(props) {
    super(props)
    this.initFriendList() // 获取推荐关键用户
    this.initFriendTopic() // 获取关注用户topic列表
    this.state = {
      followList: [],
      showPostTopic: false
    }
  }

  async initFriendList() {
    let response = await API.friendList();
    let followList = response.data.map(item => {
      item.hasFollow = false 
      return item
    })
    this.setState({
      followList: followList
    })
  }
  
  async initFriendTopic() {
    let response = await API.friendTopicList();
    this.props.addTopicList(response.data)
  }

  setFollowStatus = async (index, status) => {
    let followList = this.state.followList;
    await API.followUser({
      userId: followList[index].userId,
      status: status ? 1 : 0
    })

    this.setState({
      followList: update(this.state.followList, {
        [index]: {
          hasFollow: {$set: status}
        }
      })
    })
  }

  togglePostTopic = async () => {
    this.setState({
      showPostTopic: !this.state.showPostTopic
    })
  }
  render() {
    return (
      <div>
        <Nav />
        {
          this.state.showPostTopic ?
          <PostTopic showPostTopic={this.showPostTopic}/> :
          ""
        }
        <div className="page-container">
          <span className="loading"></span>
          <div className={Style['home-detail']}></div>

            <DynamicList/>
            <Recommend 
              followList={this.state.followList}
              setFollowStatus={this.setFollowStatus}
              togglePostTopic={this.togglePostTopic}
              />
        </div>
      </div>
    )
  }
};

export default Detail;
