import {FETCHING, GET_USER_FAILED, GET_USER_SUCCEED} from "./action-types";
import {client} from "../utils/Constants";
// action creators
export const getUserSucceed = (user) => ({type: GET_USER_SUCCEED, data: user});
export const getUserFailed = (error) => ({type: GET_USER_FAILED, data: error});
export const fetching = () => ({type: FETCHING, data: {}});

export const fetchUser = () => {

  return (dispatch) => {
    const url = `/user/current`;
    dispatch(fetching());
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Authorization': sessionStorage.getItem("Authorization")
      }
    }).then((response) => {
      response.json().then((responseJson) => {
          if (responseJson.failed === true) {
            dispatch(getUserFailed(responseJson.msg));
            return;
          }
          dispatch(getUserSucceed(responseJson));
        }
      ).catch((error) => {
        throw new Error('Invalid json response');
      });
    }).catch((error) => {
        dispatch(getUserFailed(error));
      }
    );
  };
};