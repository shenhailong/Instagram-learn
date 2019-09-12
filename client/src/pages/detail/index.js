import React, { Component } from 'react';
import Style from './index.scss'
import Nav from '@components/nav/index.js';
import Recommend from './components/recommend/index.js';
import API from '@common/api.js';
import update from 'react-addons-update';
import DynamicList from './components/dynamic-list/index.jsx'
class Detail extends Component {
  constructor(props) {
    super(props)
    this.initFriendList() // 获取推荐关键用户
    this.initFriendTopic() // 获取关注用户topic列表
    this.state = {
      followList: []
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
    console.log(response)
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

  render() {
    return (
      <div>
        <Nav />
        <div className="page-container">
          <span className="loading"></span>
          <div className={Style['home-detail']}></div>

            <DynamicList/>
            <Recommend 
              followList={this.state.followList}
              setFollowStatus={this.setFollowStatus}
              />
        </div>
      </div>
    )
  }
};

export default Detail;
