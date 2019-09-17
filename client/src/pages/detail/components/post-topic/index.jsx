import React, { Component } from 'react';
import Style from './index.scss';
import Avatar from '@components/avatar';
import { connect } from 'react-redux';
import Upload from '@components/upload/index.jsx'
import Carousel from '@components/carousel'
import { notification } from 'antd';
import API from '@common/api.js';

let ImageUpload = ({uploadImgSuccess, changeUploadStatus}) => {
  return (
    <section className="image-upload">
      <div>
        <span className="icon camera"></span>
        <span>
          <Upload successCb={uploadImgSuccess} className={'placeholder'}>上传照片</Upload>
        </span>
      </div>
      <div>
        <span onClick={() => {changeUploadStatus(1)}} className="icon network"></span>
        <span>从网络添加图片</span>
      </div>
    </section>
  )
}
@connect(
  store => {
    return {
      userInfo: store.userInfo
    }
  }
)
class PostTopic extends Component {

  constructor(props) {
    super(props)
    this.state = {
      uploadStatus: 0,
      topicDescript: '',
      imageList: []
    }
  }
  uploadImgSuccess = (url) => {
    this.setState({
      imageList: [...this.state.imageList, url],
      uploadStatus: 2
    })
    console.log(url)
  }

  changeUploadStatus = (status) => {

  }

  handleChangeTextArea = (event) => {
    this.setState({
      topicDescript: event.target.value
    })
  }

  postTopic = async () => {
    if(this.state.imageList.length === 0){
      notification.error({
        message: '请选择图片',
      });
      return
    }
    let response = await API.addTopic({
      topicImg: this.state.imageList,
      topicTitle: this.state.topicDescript
    })
    notification.success({
      message: response.message
    });
    this.props.togglePostTopic(true)
  }

  closeInputUrl = () => {}

  render() {
    let { userInfo } = this.props;
    let avatarStyle = {
      width: '40px',
      height: '40px'
    }
    let ImgUpload = () => {
      return (
        <section key={2} className="input-url">
          <div className="notice">
            <span className="close-circle" onClick={this.closeInputUrl}></span>
            <i className="icon"></i>
            <span>
              <Upload successCb={this.uploadImgSuccess} className={'placeholder'} />
              添加另一张
            </span>
          </div>
        </section>
      )
    }
    let UploadPlaceholder = () => {
      return (
        <div>
          {
            this.state.uploadStatus === 2 ? <ImgUpload /> : ''
          }
          {
            this.state.uploadStatus === 0 ? 
            <ImageUpload uploadImgSuccess={this.uploadImgSuccess} changeUploadStatus={this.changeUploadStatus}/> : ''
          }
        </div>
      )
    }
    return (
      <div className={`${Style['post-topic']}`}>
        <section className="topic-content">
          <header>
            <Avatar userInfo={userInfo} avatarStyle={avatarStyle} />
          </header>
          {
            this.state.imageList.length > 0 ? 
            (
              <section className="image-list">
                <Carousel imageList={this.state.imageList} delectPhoto={this.delectPhoto} showCloseBtn={true} showSlickDot={false}>
                </Carousel>
              </section>
            ) : ''
          }
          <div className="upload-style">
            <UploadPlaceholder successCb={this.uploadImgSuccess}/>
          </div>
          <div className="descript">
            <textarea onChange={this.handleChangeTextArea} value={this.state.topicDescript} placeholder="添加说明" name="" id="" cols="50" rows="4"></textarea>
          </div>
          <footer className="footer">
            <span onClick={() => {this.props.togglePostTopic()}} className="close">关闭</span>
            <span onClick={this.postTopic} className="post">发帖</span>
          </footer>
        </section>
      </div>
    )
  }
};

export default PostTopic;
