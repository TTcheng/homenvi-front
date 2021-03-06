import * as types from "./action-types";
import User from "../model/user";

const defaultState = {
  user: new User(),
  notices: {},
  statistics: [],
  chartsData: {},
};

export function appReducer(state = defaultState, action) {
  let newState = {...state};
  switch (action.type) {
    case types.GET_GAUGE_DATA:
      newState.chartsData.gauge = action.data;
      return newState;
    case types.GET_STATISTICS:
      newState.statistics = action.data;
      return newState;
    case types.GET_CATEGORY_DATA:
      newState.chartsData.category = action.data;
      return newState;
    case types.GET_CALENDAR_CHART_DATA:
      newState.chartsData.calendar = action.data;
      return newState;
    case types.GET_AXIS_CHART_DATA:
      newState.chartsData.axis = action.data;
      return newState;
    case types.GET_USER_SUCCEED:
      newState.user = action.data;
      return newState;
    case types.GET_UNREAD_NOTICES:
      newState.notices.unread = action.data;
      return newState;
    case types.GET_READ_NOTICES:
      newState.notices.read = action.data;
      return newState;
    case types.GET_ALL_NOTICES:
      newState.notices.all = action.data;
      return newState;
    case types.REQUEST_FAILED:
      newState.error = action.data;
      return newState;
    default:
      return state;
  }
}