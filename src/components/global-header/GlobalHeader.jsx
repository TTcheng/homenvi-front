import React, {PureComponent} from 'react';
import {Avatar, Dropdown, Icon, Menu, Spin, Tag, Tooltip,} from 'antd';
import {withRouter} from "react-router-dom";
import * as PropTypes from 'prop-types';

import './GlobalHeader.css'
import HeaderSearch from "../header-search/HeaderSearch";
import NoticeIcon from "../notice-icon/NoticeIcon";
import {routes} from "../../config/routes";
import User from "../../model/user";

@withRouter
class GlobalHeader extends PureComponent {
  static propTypes = {
    currentUser: PropTypes.instanceOf(User).isRequired,
    notices: PropTypes.object.isRequired,
    fetchNotifications: PropTypes.func.isRequired,
  };

  onNavMenuClick = (item) => {
    const path = routes.index + "/" + item.key;
    if (item.key === "dashboard") {
      this.props.history.replace(path);
      return;
    }
    this.props.history.push(path);
  };

  render() {
    const {
      currentUser,
      notices,
      fetchNotifications,
      logo,
      onMenuClick,
    } = this.props;
    const menu = (
      <Menu className="menu" selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item disabled>
          <Icon type="user"/>个人中心
        </Menu.Item>
        <Menu.Item disabled>
          <Icon type="setting"/>设置
        </Menu.Item>
        <Menu.Item key="triggerError">
          <Icon type="close-circle"/>触发报错
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="logout">
          <Icon type="logout"/>退出登录
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="header">
        <img className="ml-4 mr-4 float-left" src={logo} alt="logo" width="128" height="64"/>
        <Menu className={"left"} mode={"horizontal"} onClick={this.onNavMenuClick} defaultSelectedKeys={["dashboard"]}>
          <Menu.Item style={{"marginTop": "6px"}} key={"dashboard"}>
            仪表盘
          </Menu.Item>
          <Menu.Item key={"report"}>
            报表
          </Menu.Item>
        </Menu>
        <div className="right">
          <HeaderSearch
            className="action search"
            placeholder="站内搜索"
            dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
            onSearch={value => {
              console.log('input', value); // eslint-disable-line
            }}
            onPressEnter={value => {
              console.log('enter', value); // eslint-disable-line
            }}
          />
          <Tooltip title="使用文档">
            <a
              target="_blank"
              href="http://pro.ant.design/docs/getting-started"
              rel="noopener noreferrer"
              className="action"
            >
              <Icon type="question-circle-o"/>
            </a>
          </Tooltip>
          <NoticeIcon
            notices={notices}
            fetchNoticeData={fetchNotifications}
            currentUser={currentUser}
            className="action"
            popupAlign={{offset: [20, -16]}}
          />
          {currentUser.name ? (
            <Dropdown overlay={menu}>
                          <span className="action account">
                            <Avatar size="small" className="avatar" src={currentUser.avatar}/>
                            <span className="name">{currentUser.name}</span>
                          </span>
            </Dropdown>
          ) : (
            <Spin size="small" style={{marginLeft: 8}}/>
          )}
        </div>
      </div>
    );
  }
}

export default GlobalHeader;