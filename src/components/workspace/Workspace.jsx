import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {Breadcrumb, Button, Layout, Menu} from "antd";
import 'bootstrap/dist/css/bootstrap.min.css'

import GlobalHeader from "../global-header/GlobalHeader";
import logo from '../../containers/homenvi.svg'
import {BaseConstants} from "../../utils/Constants";

const {Header, Footer, Content} = Layout;

class Workspace extends Component {

  componentDidMount() {
    if (sessionStorage.getItem(BaseConstants.Authorization)){
      this.props.fetchUser();
    }
  }

  static propTypes = {
    user: PropTypes.object.isRequired,
    fetchUser: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Layout>
        <GlobalHeader logo={logo}
                      currentUser={this.props.user}
        />
        <Content style={{margin: '24px 24px 0', height: '100%'}}>
          <Breadcrumb linkRender={null} nameRender={null}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{background: '#fff', padding: 24, minHeight: 480}}>Content</div>
        </Content>
        <Footer style={{textAlign: "center"}}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    );
  }
}

export default Workspace;