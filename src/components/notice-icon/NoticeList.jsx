import React from 'react';
import {Avatar, Pagination, List as ListView} from 'antd';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';

import './NoticeList.css'
import {BaseConstants} from "../../utils/Constants";

NoticeList.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func,
  onPageChange: PropTypes.func,
  type: PropTypes.string,
  emptyText: PropTypes.string,
  emptyImage: PropTypes.string,
};

export default function NoticeList(props) {
  const {data, onClick, type, emptyText, emptyImage, onPageChange} = props;
  if (!data || data.totalElements === 0) {
    return (
      <div className="notFound">
        {emptyImage ? <img src={emptyImage} alt="not found"/> : null}
        <div>{emptyText}</div>
      </div>
    );
  }
  return (
    <div>
      <ListView className="list">
        {!data.content ? null : data.content.map((item, index) => {
          const itemCls = classNames("item", {
            ["read"]: item.unread === BaseConstants.NO,
          });
          return (
            <ListView.Item className={itemCls} key={item.id || index} onClick={() => onClick(item)}>
              <ListView.Item.Meta
                className="meta"
                avatar={item.avatar ? <Avatar className="avatar" src={item.avatar}/> : null}
                title={
                  <div className="title">
                    {item.title}
                  </div>
                }
                description={
                  <div>
                    <div className="datetime">{item.fromNow}</div>
                  </div>
                }
              />
            </ListView.Item>
          );
        })}
      </ListView>
      <div className="bottom">
        <Pagination onChange={(page, pageSize) => onPageChange(type, page - 1, pageSize)} className={"mt-2"} simple
                    pageSize={5} defaultCurrent={1} total={data.totalElements}/>
      </div>
    </div>
  );
}
