import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {Layout, notification} from "antd";
import 'bootstrap/dist/css/bootstrap.min.css';
// import {Redirect, Route, Router} from "react-router-dom";

import GlobalHeader from "../global-header/GlobalHeader";
import logo from '../../containers/homenvi.svg'
import {BaseConstants} from "../../utils/Constants";
// import {routes} from "../../config/routes";
import {AxisChartProvider, CalendarChartProvider, PM25ChartProvider} from "../../containers/ContainerProvider";
// import MonthTempChart from "../homenvi-charts/MonthTempChart";

const {Footer, Content} = Layout;

class Workspace extends Component {

  componentDidMount() {
    notification.config({
      placement: "bottomRight",
      top: 50,
      duration: 3
    });
    if (sessionStorage.getItem(BaseConstants.Authorization)) {
      this.props.fetchUser();
    }
  }

  static propTypes = {
    user: PropTypes.object.isRequired,
    notices: PropTypes.object,
    fetchUser: PropTypes.func.isRequired,
    fetchNotifications: PropTypes.func.isRequired,
  };

  render() {
    const {user,notices,fetchNotifications} = this.props;
    return (
      <Layout>
        <GlobalHeader logo={logo}
                      notices={notices}
                      fetchNotifications={fetchNotifications}
                      currentUser={user}
        />
        <Content style={{margin: '24px 24px 0', height: '100%'}}>
          <div style={{background: '#fff', padding: 24, minHeight: 480}}>
            <AxisChartProvider/>
            <CalendarChartProvider/>
            <PM25ChartProvider/>
            {/*<Switch>*/}
            {/*  <Route path={routes.dashboard} component={AxisChartProvider}/>*/}
            {/*  <Redirect to={routes.dashboard}/>*/}
            {/*</Switch>*/}
          </div>
        </Content>
        <Footer style={{textAlign: "center"}}>
          Homenvi . Created by ChunchengWang
        </Footer>
      </Layout>
    );
  }
}

export default Workspace;