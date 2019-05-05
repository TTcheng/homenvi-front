import React from 'react'
import {connect, Provider} from "react-redux";

import Workspace from '../components/workspace/Workspace'
import store from '../redux/store'
import HomenviAxisChart from "../components/homenvi-charts/HomenviAxisChart";
import {fetchUser, fetchNotifications, fetchAxisChartData, fetchCalendarChartData} from "../redux/actions";
import MonthTempChart from "../components/homenvi-charts/MonthTempChart";

const WorkspaceCom = connect(
  (state) => ({user: state.user, notices: state.notices}),
  {fetchUser, fetchNotifications}
)(Workspace);


export const WorkspaceProvider = () => (
  <Provider store={store}>
    <WorkspaceCom/>
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