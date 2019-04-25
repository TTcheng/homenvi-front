// api prefix
const prefix = '/api';
// method types
export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const DEL = 'DELETE';

// auth
export const authorize = {
  login: {route: prefix + '/auth/login', method: POST},
  logout: {route: prefix + '/auth/logout', method: DEL},
  currentUser: {route: prefix + '/auth/current', method: GET},
  currentUserDetail: {route: prefix + '/auth/currentDetail', method: GET},
  checkLogin: {route: prefix + '/auth/check', method: GET},
};

// users
export const users = {
  detail: {route: prefix + '/users/:id', method: GET},
  update: {route: prefix + '/users', method: PUT},
};

// notifications
export const notifications = {
  list: {route: prefix + '/notifications', method: GET},
  detail: {route: prefix + '/notifications/:id', method: GET},
  create: {route: prefix + '/notifications', method: POST},
  update: {route: prefix + '/notifications/:id', method: PUT},
  remove: {route: prefix + '/notifications/:id', method: DEL},
};

// influxDB
export const influx = {
  getDbUser: {route: prefix + '/homenvi/influxusers', method: GET},
  query: {route: '/influx/query', method: GET},
};