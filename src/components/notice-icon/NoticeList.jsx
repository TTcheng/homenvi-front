import React from 'react';
import {Avatar, List as ListView} from 'antd';
import classNames from 'classnames';
import './NoticeList.css'

export default function NoticeList(props) {
  const {data = [], onClick, onClear, title, locale, emptyText, emptyImage,} = props;
  if (data.length === 0) {
    return (
      <div className="notFound">
        {emptyImage ? <img src={emptyImage} alt="not found"/> : null}
        <div>{emptyText || locale.emptyText}</div>
      </div>
    );
  }
  return (
    <div>
      <ListView className="List">
        {data.map((item, i) => {
          const itemCls = classNames("item", {
            ["read"]: item.read,
          });
          return (
            <ListView.Item className={itemCls} key={item.key || i} onClick={() => onClick(item)}>
              <ListView.Item.Meta
                className="meta"
                avatar={item.avatar ? <Avatar className="avatar" src={item.avatar}/> : null}
                title={
                  <div className="title">
                    {item.title}
                    <div className="extra">{item.extra}</div>
                  </div>
                }
                description={
                  <div>
                    <div className="description" title={item.description}>
                      {item.description}
                    </div>
                    <div className="datetime">{item.datetime}</div>
                  </div>
                }
              />
            </ListView.Item>
          );
        })}
      </ListView>
      <div className="clear" onClick={onClear}>
        {locale.clear}
        {title}
      </div>
    </div>
  );
}
