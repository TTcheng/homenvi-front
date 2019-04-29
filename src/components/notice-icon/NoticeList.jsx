import React from 'react';
import {Avatar, Pagination, List as ListView} from 'antd';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';

import './NoticeList.css'

NoticeList.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func,
  type: PropTypes.string,
  emptyText: PropTypes.string,
  emptyImage: PropTypes.string,
};

export default function NoticeList(props) {
  const {data, onClick, type, emptyText, emptyImage,} = props;
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
      <ListView className="List">
        {!data.content ? null : data.content.map((item, index) => {
          const itemCls = classNames("item", {
            ["read"]: type === 'read',
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
        <Pagination className={"mt-2"} simple defaultCurrent={1} total={data.totalElements}/>
      </div>
    </div>
  );
}
