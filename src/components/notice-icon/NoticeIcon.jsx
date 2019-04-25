import React, {PureComponent} from 'react';
import {Badge, Icon, Popover, Spin, Tabs} from 'antd';
import classNames from 'classnames';

import NoticeList from './NoticeList';
import './NoticeIcon.css';

const {TabPane} = Tabs;

export default class NoticeIcon extends PureComponent {
  state = {
    loading: false,
  };

  getNoticeData = (type, page = 0, size = 5) => {
    const {notices, currentUser, fetchNoticeData} = this.props;
    const exist = notices[type];
    if (exist && exist.content) {
      return;
    }
    this.setState({loading: true});
    fetchNoticeData({type, usreid: currentUser.userid, page, size}, () => {
      this.setState({loading: false})
    });
  };

  onItemClick = (item) => {
    // todo
  };
  onTabChange = (type) => {
    this.getNoticeData(type)
  };

  onVisibleChange = (type) => {
    this.getNoticeData(type);
  };

  getNotificationBox = () => {
    const {notices} = this.props;
    return (
      <Spin spinning={this.state.loading} delay={0}>
        <Tabs className="tabs" onChange={this.onTabChange}>
          <TabPane tab={"未读"} key={"unread"}>
            <NoticeList
              data={notices.unread}
              type={'unread'}
              emptyText="您已读完所有消息"
              emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
              onClick={item => this.onItemClick(item)}
            />
          </TabPane>
          <TabPane tab={"已读"} key={"read"}>
            <NoticeList
              data={notices.read}
              type={'read'}
              emptyText="这里什么也没有诶"
              emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
              onClick={item => this.onItemClick(item)}
            />
          </TabPane>
          <TabPane tab={"全部"} key={"all"}>
            <NoticeList
              data={notices.all}
              type={'all'}
              emptyText="这里什么也没有诶"
              emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
              onClick={item => this.onItemClick(item)}
            />
          </TabPane>
        </Tabs>
      </Spin>
    );
  };

  render() {
    const {className, currentUser, popupAlign} = this.props;
    const noticeButtonClass = classNames(className, "noticeButton");
    const notificationBox = this.getNotificationBox();
    const trigger = (
      <span className={noticeButtonClass}>
        <Badge count={currentUser.notifyCount} className="badge">
          <Icon type="bell" className="icon"/>
        </Badge>
      </span>
    );
    const popoverProps = {};
    if ('popupVisible' in this.props) {
      popoverProps.visible = this.props.popupVisible;
    }
    return (
      <Popover
        placement="bottomRight"
        content={notificationBox}
        popupClassName="popover"
        trigger="click"
        arrowPointAtCenter
        popupAlign={popupAlign}
        onVisibleChange={() => this.onVisibleChange('unread')}
        {...popoverProps}
      >
        {trigger}
      </Popover>
    );
  }
}
