import {GET_USER_FAILED, GET_USER_SUCCEED} from "./action-types";
import {apiRequest} from "../utils/request";
import {authorize} from "../config/apis";
import User from "../model/user";
// action creators
export const getUserSucceed = (user) => ({type: GET_USER_SUCCEED, data: user});
export const getUserFailed = (error) => ({type: GET_USER_FAILED, data: error});

export const fetchUser = () => {
  return (dispatch) => {
    apiRequest(authorize.currentUserDetail, undefined, (responseJson) => {
      let user = new User(responseJson.loginName, responseJson.id, responseJson.avatar, responseJson.notifyCount);
      dispatch(getUserSucceed(user));
    });
  };
};