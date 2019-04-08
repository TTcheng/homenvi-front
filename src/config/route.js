export const pages = {
  index: '/home',
  login: '/login',
};

const prefix = '/api';
export const apis = {
  login: prefix + '/user/login',
  currentUser: prefix + '/user/current',
  checkLogin: prefix + '/user/check',
};