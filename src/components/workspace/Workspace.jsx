import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {Breadcrumb, Button, Layout, Menu} from "antd";
import 'bootstrap/dist/css/bootstrap.min.css'

import GlobalHeader from "../global-header/GlobalHeader";
import logo from '../homenvi.svg'

const {Header, Footer, Content} = Layout;

class Workspace extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Layout>
        <GlobalHeader logo={logo}
                      currentUser={{
                        name: 'Serati Ma',
                        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
                        userid: '00000001',
                        notifyCount: 12,
                      }}
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