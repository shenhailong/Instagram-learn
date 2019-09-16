import React, { Component } from 'react';
import Style from './index.scss'
import { notification } from 'antd';
import API from '@common/api.js';
import PropTypes from 'prop-types';
import * as qiniu from 'qiniu-js';
class Upload extends Component {
  uploadFn = async () => {
    let response = await API.getToken();
    let { baseUrl, token } = response.data;
    let files = this.refs.upload.files;
    console.log(files)
    if(!this.imageVerify()) return;
    let putExtra = {
      fname: '',
      params: {},
      mimeType: [ 'image/png', 'image/jpeg', 'image/gif']
    }
    let config = {
      region: qiniu.region.z1
    }
    let key = new Date().getTime() + files[0].name;
    let observable = qiniu.upload(files[0], key, token, putExtra, config);
    let observer = {
      complete: (res) => {
        let imgUrl = baseUrl + '/' + res.key
        this.props.successCb(imgUrl)
      },
      error: (err) => {
        notification.error({
          message: err
        })
      }
    }
    var subscription = observable.subscribe(observer) // 上传开始
  }

  imageVerify = () => {
    let files = this.refs.upload.files;
    let fileType = files[0].type;
    if(/^image/.test(fileType)){
      return true
    }
    notification.error({
      message: '类型错误'
    })
    return false
  }
  render() {
    return (
      <input onChange={this.uploadFn} accept="image/*" ref="upload" type="file" className={Style['upload-image']} />
    )
  }
};

Upload.defaultProps = {
  successCb: () => {}
}

export default Upload;
