import React, { Component } from 'react';
import Style from './index.scss'
import { notification } from 'antd';
import API from '@common/api.js';
import PropTypes from 'prop-types';
import * as qiniu from 'qiniu-js';
class Upload extends Component {
  uploadFn = async () => {
    let files = this.refs.upload.files;
    console.log(files)
    if(!this.imageVerify()) return;
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
