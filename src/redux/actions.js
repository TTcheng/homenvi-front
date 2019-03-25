import {FETCHING, GET_USER_FAILED, GET_USER_SUCCEED} from "./action-types";
// action creators
export const getUserSucceed = (user) => ({type: GET_USER_SUCCEED, data: user});
export const getUserFailed = (error) => ({type: GET_USER_FAILED, data: error});
export const fetching = () => ({type: FETCHING, data: {}});

export const fetchUser = (userId) => {
  return (dispatch) => {
    const url = `/user/${userId}`;
    dispatch(fetching());
    fetch(url).then((response) => {
      response.json().then((responseJson) => {
          if (responseJson.failed == true) {
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