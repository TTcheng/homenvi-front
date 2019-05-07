import React from 'react'
import {connect, Provider} from "react-redux";
import {LocaleProvider} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

import Workspace from '../components/workspace/Workspace'
import store from '../redux/store'
import HomenviAxisChart from "../components/homenvi-charts/HomenviAxisChart";
import {
  fetchUser,
  fetchNotifications,
  fetchAxisChartData,
  fetchCalendarChartData,
  fetchCategoryData
} from "../redux/actions";
import MonthTempChart from "../components/homenvi-charts/MonthTempChart";
import Pm25CategoryChart from "../components/homenvi-charts/PM25CategoryChart";

moment.locale('zh-cn');

const WorkspaceCom = connect(
  (state) => ({user: state.user, notices: state.notices}),
  {fetchUser, fetchNotifications}
)(Workspace);


export const WorkspaceProvider = () => (
  <Provider store={store}>
    <LocaleProvider locale={zh_CN}>
      <WorkspaceCom/>
    </LocaleProvider>;
  </Provider>
);

const AxisChartCom = connect(
  (state) => ({chartsData: state.chartsData.axis, options: {autoRefresh: false, timeout: 5000}}),
  {fetchEChartsData: fetchAxisChartData}
)(HomenviAxisChart);

export const AxisChartProvider = () => (
  <Provider store={store}>
    <AxisChartCom/>
  </Provider>
);

const CalendarChartCom = connect(
  (state) => ({data: state.chartsData.calendar}),
  {fetchEChartsData: fetchCalendarChartData}
)(MonthTempChart);

export const CalendarChartProvider = () => (
  <Provider store={store}>
    <CalendarChartCom/>
  </Provider>
);

const PM25ChartCom = connect(
  (state) => ({data: state.chartsData.category}),
  {fetchCategoryData: fetchCategoryData}
)(Pm25CategoryChart);

export const PM25ChartProvider = () => (
  <Provider store={store}>
    <PM25ChartCom/>
  </Provider>
);