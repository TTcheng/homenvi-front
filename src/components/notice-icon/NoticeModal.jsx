import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {Button, Modal} from "antd";
import {BaseConstants} from "../../utils/Constants";
import {apiRequest} from "../../utils/request";
import {notifications} from "../../config/apis";

const btnTypes = {primary: 'primary', default: 'default'};
const btnTexts = {cancel: '取消', read: '标为已读', unread: '标为未读'};

class NoticeModal extends Component {
  componentWillReceiveProps(nextProps, nextContext) {
    this.setBtnProps(nextProps)
  }

  state = {
    readBtnType: btnTypes.primary,
    unreadBtnType: btnTypes.default,
    readBtnText: btnTexts.read,
    unreadBtnText: btnTexts.unread,
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

  setBtnProps = (nextProps) => {
    const {notice} = nextProps;
    if (null != notice && BaseConstants.YES === notice.unread) {
      this.setState({
        readBtnType: btnTypes.primary,
        unreadBtnType: btnTypes.default,
        readBtnText: btnTexts.read,
        unreadBtnText: btnTexts.cancel,
      });
    } else {
      this.setState({
        readBtnType: btnTypes.default,
        unreadBtnType: btnTypes.primary,
        readBtnText: btnTexts.cancel,
        unreadBtnText: btnTexts.unread,
      });
    }
  };

  render() {
    const {notice, visible} = this.props;
    if (!notice) {
      return null;
    }
    const {readBtnType, unreadBtnType, readBtnText, unreadBtnText, readLoading, unreadLoading} = this.state;
    return (
      <Modal
        title={notice.title}
        centered
        visible={visible}
        footer={[
          <Button key="read" type={readBtnType} loading={readLoading}
                  onClick={this.onRead} htmlType="button">
            {readBtnText}
          </Button>,
          <Button key="unread" type={unreadBtnType} loading={unreadLoading}
                  onClick={this.onUnread} htmlType="button">
            {unreadBtnText}
          </Button>,
        ]}
        onCancel={this.props.close}
      >
        {/*<p>{notice.content}</p>*/}
        <div dangerouslySetInnerHTML={{__html: notice.content}}/>
        <p>{notice.datetime}</p>
      </Modal>
    );
  }
}

export default NoticeModal;