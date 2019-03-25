import {FETCHING, GET_USER_FAILED, GET_USER_SUCCEED} from "./action-types";

const defaultUser = {
  name: 'Serati Ma',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
  userId: '00000001',
  notifyCount: 12,
};

export function userReducer(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER_SUCCEED:
      return action.data;
    case GET_USER_FAILED:
      return action.data;
    case FETCHING:
      return action.data;
    default:
      return state;
  }
}