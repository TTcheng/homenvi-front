import React from 'react'
import {connect, Provider} from "react-redux";

import Workspace from '../components/workspace/Workspace'
import store from '../redux/store'
import HomenviAxisChart from "../components/homenvi-charts/HomenviAxisChart";
import {fetchUser, fetchNotifications, fetchEChartsData} from "../redux/actions";

const WorkspaceCom = connect(
  (state) => ({user: state.user, notices: state.notices}),
  {fetchUser, fetchNotifications}
)(Workspace);


export const WorkspaceProvider = () => (
  <Provider store={store}>
    <WorkspaceCom/>
  </Provider>
);

const DashboardCom = connect(
  (state) => ({chartsData: state.chartsData, options: {autoRefresh: false, timeout: 5000}}),
  {fetchEChartsData}
)(HomenviAxisChart);

export const DashboardProvider = () => (
  <Provider store={store}>
    <DashboardCom/>
  </Provider>
);