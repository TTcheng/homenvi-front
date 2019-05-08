import {Statistic, Row, Col} from 'antd';
import React, {Component} from 'react';
import * as PropTypes from 'prop-types';

import HomenviStatistic from '../../model/homenvi-statistic'

export default class Statistics extends Component {
  static propTypes = {
    fetchStatistics: PropTypes.func.isRequired,
    statistics: PropTypes.arrayOf(HomenviStatistic).isRequired,
  };

  componentDidMount() {
    this.props.fetchStatistics();
  }

  render() {
    const {statistics} = this.props;
    console.debug(statistics);
    if (!statistics || statistics.length < 1) {
      return null;
    }
    const colLen = Math.floor(24 / statistics.length);
    return (
      <div style={{background: '#fff', 'padding-bottom': '10px', 'border-bottom': '2px solid rgba(0,0,0,0.2)'}}>
        <Row gutter={16}>
          {statistics.map(statistic => {
            const {title, value, precision, color, prefix, suffix} = statistic;
            return (
              <Col span={colLen}>
                <Statistic
                  title={title}
                  value={value}
                  precision={precision}
                  valueStyle={{color: color}}
                  prefix={prefix}
                  suffix={suffix}
                />
              </Col>)
          })}
        </Row>
      </div>
    )
  }
}