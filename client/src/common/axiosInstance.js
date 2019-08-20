import axios from 'axios';
import baseDomain from './config.js';
import { notification } from 'antd';

const instance = axios.create({
  xsrfCookieName: 'xscf-name',
  baseURL: baseDomain
})

instance.interceptors.response.use(function(response) {
  if (response.data.success) {
    return Promise.resolve(response.data);
  } else {
    notification.error({
      message: response.data.message
    })
    return Promise.reject({
      message: response.data.message
    })
  }
}, function(error) {
  try{
    notification.error({
      message: error.response.data.message
    })
    if (error.response.status === 401){
      setTimeout(() => {
        window.location.href = '/login'
      }, 2000)
    }
  } catch(e) {
    notification.error({
      message: '系统异常，请稍后尝试！'
    })
  }
  return Promise.reject({
    messageCode: 'sysError'
  })
})

instance.interceptors.request.use()

export default instance;
