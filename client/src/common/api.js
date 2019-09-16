import instance from './axiosInstance.js';

exports.login = (data) => {
  return instance.post('/login', data);
}

exports.getUserInfo = (data) => {
  return instance.get('/user/info');
}

exports.signOut = ()=> {
  return instance.get('/login/signout');
}

// 关注
exports.followUser = (data) => {
  return instance.post('/friend/follow', data);
}

exports.friendList = (data) =>{
  return instance.get('/friend/list', data)
}

exports.friendTopicList = () => {
  return instance.get('/topic/friend/list')
}

exports.addDiscuss = (data) => {
  return instance.post('/topic/discuss/add', data)
}