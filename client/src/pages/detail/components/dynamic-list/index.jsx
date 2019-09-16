import React, { Component } from 'react';
import Style from './index.scss';
import { connect } from 'react-redux';
import Avatar from '@components/avatar';
import Carousel from '@components/carousel';
import Comments from '@components/comments/index.jsx';
@connect(
  store => {
    return {
      dynamicList: store.topicList,
      userInfo: store.userInfo
    }
  },
  dispatch => {
    return {}
  }
)
class DynamicList extends Component {
  render() {
    return (
      <div className={Style['dynamic-list']}>
        {
          this.props.dynamicList.map((item, index) => {
            let arr = []
            const imgList = item.topic.topicImgList
            arr.push(imgList)
            return (
              <article key={index} className="article">
                <header className="header">
                  <Avatar userInfo={item.userInfo} />
                </header>
                <div className="container">
                  <Carousel imageList={arr}/>
                </div>
                <div className="comments-container">
                  <Comments topicId={item.topic.topicId}/>
                </div>
              </article>
            )
          })
        }
      </div>
    )
  }
};

export default DynamicList;
