import moment from 'moment';

import * as types from "./action-types";
import request, {apiRequest} from "../utils/request";
import {authorize, influx, notifications} from "../config/apis";
import User from "../model/user";
import {InfluxAuth, NoticeTypes, Symbol, VitalHomenviDataTypes} from "../utils/Constants";
import {encodeUrlData} from "../utils/UrlUtils";
import {
  resolveCalendarData,
  resolveCategoryData, resolveGaugeData,
  resolveSingleQuery,
} from "../utils/InfluxDataUtils";
import SqlHelper from "../utils/SqlHelper";
import Pair from "../model/pair";
import HomenviStatistic, {trends} from "../model/homenvi-statistic";

// action creators
const getUserSucceed = (user) => ({type: types.GET_USER_SUCCEED, data: user});
const getUnreadNotices = (notices) => ({type: types.GET_UNREAD_NOTICES, data: notices});
const getReadNotices = (notices) => ({type: types.GET_READ_NOTICES, data: notices});
const getAllNotices = (notices) => ({type: types.GET_ALL_NOTICES, data: notices});
const requestFailed = (error) => ({type: types.REQUEST_FAILED, data: error});
const getAxisChartData = (chartsData) => ({type: types.GET_AXIS_CHART_DATA, data: chartsData});
const getCalendarChartData = (calendarData) => ({type: types.GET_CALENDAR_CHART_DATA, data: calendarData});
const getCategoryChartData = (categoryData) => ({type: types.GET_CATEGORY_DATA, data: categoryData});
const getStatistics = (statistics) => ({type: types.GET_STATISTICS, data: statistics});
const getGaugeData = (gaugeData) => ({type: types.GET_GAUGE_DATA, data: gaugeData});

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

export const fetchAxisChartData = (sql, title, nameUnitPairs) => {
  let {route, method} = influx.query;
  let url = route;
  url += Symbol.QUES;
  url += encodeUrlData(InfluxAuth);
  url += `&q=${sql}`;

  return (dispatch) => {
    request(method, url, undefined, (response) => {
      dispatch(getAxisChartData(resolveSingleQuery(response, title, nameUnitPairs)));
    });
  }
};

export const fetchCalendarChartData = (sql, title, nameUnit) => {
  let {route, method} = influx.query;
  let url = route;
  url += Symbol.QUES;
  url += encodeUrlData(InfluxAuth);
  url += `&q=${sql}`;

  return (dispatch) => {
    request(method, url, undefined, (response) => {
      dispatch(getCalendarChartData(resolveCalendarData(response, title, nameUnit)));
    });
  }
};

export const fetchCategoryData = (sql, homenviDataType, title) => {
  let {route, method} = influx.query;
  let url = route;
  url += Symbol.QUES;
  url += encodeUrlData(InfluxAuth);
  url += `&q=${sql}`;

  return (dispatch) => {
    request(method, url, undefined, (response) => {
      dispatch(getCategoryChartData(resolveCategoryData(response, homenviDataType, title)));
    });
  }
};


export const fetchStatistics = () => {
  let {route, method} = influx.query;
  let url = route;
  url += Symbol.QUES;
  url += encodeUrlData(InfluxAuth);
  const fields = VitalHomenviDataTypes.map(type => (`mean(${type.field}) as ${type.field}`));
  const condition = ['time>now()-2h'];
  const orders = [new Pair('time', 'desc')];
  const sql = SqlHelper.query(fields, 'collections', condition, ['time(1h)'], orders);
  url += `&q=${sql}`;

  return (dispatch) => {
    request(method, url, undefined, (response) => {
      const series = response.results[0].series[0];
      const {values, columns} = series;
      const todayData = values[0], yesterdayData = values[1];
      let statistics = [];
      for (let i = 1; i < columns.length; i++) {
        for (let index in VitalHomenviDataTypes) {
          const type = VitalHomenviDataTypes[index];
          if (type.field === columns[i]) {
            const value = todayData[i];
            let trend = trends.up;
            if (value < yesterdayData[i]) {
              trend = trends.down
            }
            statistics.push(new HomenviStatistic(type.name, value, type.unit, trend, type.state(value)));
            break;
          }
        }
      }
      dispatch(getStatistics(statistics));
    });
  }
};

export const fetchGaugeData = (sql, homenviDataTypes, title) => {
  let {route, method} = influx.query;
  let url = route;
  url += Symbol.QUES;
  url += encodeUrlData(InfluxAuth);
  url += `&q=${sql}`;

  return (dispatch) => {
    request(method, url, undefined, (response) => {
      dispatch(getGaugeData(resolveGaugeData(response, homenviDataTypes, title)));
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