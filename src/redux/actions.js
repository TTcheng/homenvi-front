import moment from 'moment';

import * as types from "./action-types";
import request, {apiRequest} from "../utils/request";
import {authorize, influx, notifications} from "../config/apis";
import User from "../model/user";
import {NoticeTypes, Symbol, InfluxAuth} from "../utils/Constants";
import {encodeUrlData} from "../utils/UrlUtils";
import {resolveSingleQuery} from "../utils/InfluxDataUtils";

// action creators
const getUserSucceed = (user) => ({type: types.GET_USER_SUCCEED, data: user});
const getUnreadNotices = (notices) => ({type: types.GET_UNREAD_NOTICES, data: notices});
const getReadNotices = (notices) => ({type: types.GET_READ_NOTICES, data: notices});
const getAllNotices = (notices) => ({type: types.GET_ALL_NOTICES, data: notices});
const requestFailed = (error) => ({type: types.REQUEST_FAILED, data: error});
const getChartsData = (chartsData) => ({type: types.GET_CHARTS_DATA, data: chartsData});

export const fetchNotifications = (options, callback) => {
  return (dispatch) => {
    let payload = {...options};
    const {read, unread, all} = NoticeTypes;
    switch (options.type) {
      case unread:
        payload.unread = 1;
        apiRequest(notifications.list, payload, (response) => {
          dispatch(getUnreadNotices(fixNoticeData(response)));
          callback(response);
        });
        break;
      case read:
        payload.unread = 0;
        apiRequest(notifications.list, payload, (response) => {
          dispatch(getReadNotices(fixNoticeData(response)));
          callback(response);
        });
        break;
      case all:
        apiRequest(notifications.list, payload, (response) => {
          dispatch(getAllNotices(fixNoticeData(response)));
          callback(response);
        });
        break;
    }
  }
};

export const fetchUser = () => {
  return (dispatch) => {
    apiRequest(authorize.currentUserDetail, undefined, (responseJson) => {
      let user = new User(responseJson.loginName, responseJson.id, responseJson.avatar, responseJson.notifyCount);
      dispatch(getUserSucceed(user));
    });
  };
};

export const fetchEChartsData = (sql, title, nameUnitPairs) => {
  let {route, method} = influx.query;
  let url = route;
  url += Symbol.QUES;
  url += encodeUrlData(InfluxAuth);
  url += `&q=${sql}`;

  return (dispatch) => {
    request(method, url, undefined, (response) => {
      dispatch(getChartsData(resolveSingleQuery(response, title, nameUnitPairs)));
    });
  }
};

const fixNoticeData = (origin) => {
  let res = {...origin};
  res.content = origin.content.map(item => {
    return fixNotice(item)
  });
  return res;
};

const fixNotice = (origin) => {
  const fromNow = moment(origin.creationDate).fromNow();
  return {
    ...origin,
    datetime: origin.creationDate,
    fromNow,
    key: origin.id,
  }
};