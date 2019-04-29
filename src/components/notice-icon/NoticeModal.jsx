import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {Button, Modal} from "antd";
import {BaseConstants} from "../../utils/Constants";
import {apiRequest} from "../../utils/request";
import {notifications} from "../../config/apis";

class NoticeModal extends Component {
  state = {
    readLoading: false,
    unreadLoading: false,
  };

  static propTypes = {
    notice: PropTypes.object,
    visible: PropTypes.bool,
    close: PropTypes.func.isRequired,
    refreshNotices: PropTypes.func.isRequired,
  };

  onRead = () => {
    let notice = {...this.props.notice};
    if (notice.unread === BaseConstants.NO) {
      this.props.close();
      return;
    }
    const {refreshNotices} = this.props;
    this.setState({readLoading: true});
    notice.unread = BaseConstants.NO;
    apiRequest(notifications.update, notice, (response) => {
      this.setState({readLoading: false});
      this.props.close();
      refreshNotices('unread', 'read');
    });
  };
  onUnread = () => {
    let notice = {...this.props.notice};
    if (notice.unread === BaseConstants.YES) {
      this.props.close();
      return;
    }
    const {refreshNotices} = this.props;
    this.setState({unreadLoading: true});
    notice.unread = BaseConstants.YES;
    apiRequest(notifications.update, notice, (response) => {
      this.setState({unreadLoading: false});
      this.props.close();
      refreshNotices('read', 'unread');
    });
  };

  render() {
    const {notice, visible} = this.props;
    if (!notice) {
      return null;
    }
    return (
      <Modal
        title={notice.title}
        centered
        visible={visible}
        footer={[
          <Button key="read" type="primary" loading={this.state.readLoading} onClick={this.onRead} htmlType="button">
            标为已读
          </Button>,
          <Button key="unread" loading={this.state.unreadLoading} onClick={this.onUnread} htmlType="button">
            标为未读
          </Button>,
        ]}
        onCancel={this.props.close}
      >
        <p>{notice.content}</p>
        <p>{notice.datetime}</p>
      </Modal>
    );
  }
}

export default NoticeModal;