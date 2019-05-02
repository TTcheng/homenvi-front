import {BaseConstants, client, Symbol} from "./Constants";
import {notification} from "antd";
import {encodeUrlData, setUrlParams} from "./UrlUtils";
import {authorize, GET, POST, PUT, DEL} from "../config/apis";

export default function request(method, url, data, callback) {
  method = method.toUpperCase();
  url = setUrlParams(url, data);
  let body = undefined;
  if (method === GET) {
    if (data) {
      url += Symbol.QUES;
      url += encodeUrlData(data);
    }
  } else {
    body = data && JSON.stringify(data);
  }
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': sessionStorage.getItem(BaseConstants.Authorization) || '',
      // 从sessionStorage中获取access token
    }, body
  }).then((response) => {
    if (response.status === 401) {
      // hashHistory.push(pages.login);
      return Promise.reject('Unauthorized.');
    }
    response.json().then((responseJson) => {
        if (response.ok) {
          if (!responseJson.failed) {
            if (callback){
              callback(responseJson);
            }
            return;
          }
          notification.error({message: responseJson.message});
          return;
        }
        if (responseJson.error_description) {
          notification.error({message: responseJson.error_description});
        }
        if (responseJson.message) {
          notification.error({message: response.status, description: responseJson.message})
        }
      }
    ).catch((error) => {
      console.error(error);
      notification.error({message: 'Invalid json response'});
      throw new Error('Invalid json response');
    });
  });
}

const requestBody = client;
export const auth = (username, password, callback) => {
  requestBody.username = username;
  requestBody.password = password;
  const {route, method} = authorize.login;
  fetch(route, {
    method: method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: encodeUrlData(requestBody)
  }).then((response) => {
    response.json().then((responseJson) => {
      if (response.ok) {
        if (!responseJson.failed) {
          const authToken = `${responseJson.token_type} ${responseJson.access_token}`;
          sessionStorage.setItem(BaseConstants.Authorization, authToken);
          notification.success({message: '登录成功！'});
          callback();
          return;
        }
        notification.error({message: responseJson.message});
        return;
      }
      if (responseJson.error_description) {
        notification.error({message: responseJson.error_description});
      }
      if (responseJson.message) {
        notification.error({message: response.status, description: responseJson.message})
      }
    }).catch((error) => {
      console.error(error);
      notification.error({message: response.status});
    });
  });
};
export const get = (url, data, callback) => request(GET, url, data, callback);
export const post = (url, data, callback) => request(POST, url, data, callback);
export const put = (url, data, callback) => request(PUT, url, data, callback);
export const del = (url, data, callback) => request(DEL, url, data, callback);
export const apiRequest = (api, data, callback) => request(api.method, api.route, data, callback);