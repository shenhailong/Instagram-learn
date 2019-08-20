import instance from './axiosInstance.js';

exports.login = (data) => {
  return instance.post('/login', data);
}
