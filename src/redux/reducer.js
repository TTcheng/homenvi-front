import {GET_USER_FAILED, GET_USER_SUCCEED} from "./action-types";
import User from "../model/user";

const defaultUser = new User();

export function userReducer(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER_SUCCEED:
      return action.data;
    case GET_USER_FAILED:
      return action.data;
    default:
      return state;
  }
}