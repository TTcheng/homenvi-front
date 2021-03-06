import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {Layout, notification} from "antd";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Switch} from "react-router-dom";

import GlobalHeader from "../global-header/GlobalHeader";
import logo from '../../containers/homenvi.svg'
import {BaseConstants} from "../../utils/Constants";
import {routes} from "../../config/routes";
import {AxisChartProvider} from "../../containers/ContainerProvider";
import Dashboard from "../../containers/Dashboard";
import Analysis from "../../containers/Analysis";

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
    const {user, notices, fetchNotifications} = this.props;
    return (
      <Layout>
        <GlobalHeader logo={logo}
                      notices={notices}
                      fetchNotifications={fetchNotifications}
                      currentUser={user}
        />
        <Content style={{margin: '24px 24px 0', height: '100%'}}>
          <div style={{background: '#fff', padding: 24, minHeight: 480}}>
            <Switch>
              <Route path={routes.dashboard} component={Dashboard}/>
              <Route path={routes.analysis} component={Analysis}/>
            </Switch>
          </div>
        </Content>
        <Footer style={{textAlign: "center"}}>
          Homenvi . developed by WangChuncheng
        </Footer>
      </Layout>
    );
  }
}

export default Workspace;