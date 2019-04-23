import React, {PureComponent} from 'react';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import {Menu, Icon, Spin, Tag, Dropdown, Avatar, Tooltip,} from 'antd';
import {withRouter} from "react-router-dom";

import './GlobalHeader.css'
import HeaderSearch from "../header-search/HeaderSearch";
import NoticeIcon from "../notice-icon/NoticeIcon";
import {routes} from "../../config/routes";

@withRouter
class GlobalHeader extends PureComponent {

  getNoticeData() {
    const {notices = []} = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = {...notice};
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      // transform id to item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{marginRight: 0}}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

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
      currentUser = {},
      fetchingNotices,
      logo,
      onNoticeVisibleChange,
      onMenuClick,
      onNoticeClear,
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
    const noticeData = this.getNoticeData();
    return (
      <div className="header">
        <img className="ml-4 mr-4 float-left" src={logo} alt="logo" width="128" height="64"/>
        <Menu className={"left"} mode={"horizontal"} onClick={this.onNavMenuClick} defaultSelectedKeys={["dashboard"]}>
          <Menu.Item style={{"marginTop":"6px"}} key={"dashboard"}>
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
            className="action"
            count={currentUser.notifyCount}
            onItemClick={(item, tabProps) => {
              console.log(item, tabProps); // eslint-disable-line
            }}
            onClear={onNoticeClear}
            onPopupVisibleChange={onNoticeVisibleChange}
            loading={fetchingNotices}
            popupAlign={{offset: [20, -16]}}
          >
            <NoticeIcon.Tab
              list={noticeData['通知']}
              title="通知"
              emptyText="你已查看所有通知"
              emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
            />
            <NoticeIcon.Tab
              list={noticeData['消息']}
              title="消息"
              emptyText="您已读完所有消息"
              emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
            />
            <NoticeIcon.Tab
              list={noticeData['待办']}
              title="待办"
              emptyText="你已完成所有待办"
              emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
            />
          </NoticeIcon>
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