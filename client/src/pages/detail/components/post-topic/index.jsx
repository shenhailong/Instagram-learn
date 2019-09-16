import React, { Component } from 'react';
import Style from './index.scss';
import Avatar from '@components/avatar';
import { connect } from 'react-redux';
import Upload from '@components/upload/index.jsx'

let ImageUpload = (uploadImgSuccess, changeUploadStatus) => {
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
      topicDescript: ''
    }
  }
  uploadImgSuccess = () => {}

  changeUploadStatus = (status) => {

  }

  handleChangeTextArea = (event) => {
    this.setState({
      topicDescript: event.target.value
    })
  }

  postTopic = async () => {
    
  }

  render() {
    let { userInfo } = this.props;
    let avatarStyle = {
      width: '40px',
      height: '40px'
    }
    let UploadPlaceholder = () => {
      return (
        <div>
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
