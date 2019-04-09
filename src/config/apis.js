// api prefix
const prefix = '/api';
// method types
const get = 'GET';
const post = 'POST';
const put = 'PUT';
const del = 'DELETE';

// auth
export const authorize = {
  login: {route: prefix + '/auth/login', method: post},
  logout: {route: prefix + '/auth/logout', method: del},
  currentUser: {route: prefix + '/auth/current', method: get},
  currentUserDetail: {route: prefix + '/auth/currentDetail', method: get},
  checkLogin: {route: prefix + '/auth/check', method: get},
};

// users
export const users = {
  detail: {route: prefix + '/users/:id', method: get},
  update: {route: prefix + '/users', method: put},
};

// notifications
export const notifications = {
  list: {route: prefix + '/notifications', method: get},
  detail: {route: prefix + '/notifications/:id', method: get},
  create: {route: prefix + '/notifications', method: post},
  update: {route: prefix + '/notifications/:id', method: put},
  remove: {route: prefix + '/notifications/:id', method: del},
};