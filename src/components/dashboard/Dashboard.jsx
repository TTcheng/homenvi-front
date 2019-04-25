import React, {Component} from 'react';
import * as PropTypes from 'prop-types';

import AxisChart from "../charts/AxisChart";
import AxisChartData from "../../model/axis-chart-data";
import Pair from "../../model/pair";


class Dashboard extends Component {
  static propTypes = {

  };
  render() {
    let xData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    let yData = [];
    yData.push({
      name: '温度',
      data: [15, 17, 19, 22, 21, 18, 16]
    });

    yData.push({
      name: '湿度',
      data: [25, 27, 30, 34, 29, 31, 16]
    });

    let data = new AxisChartData('温湿度', xData, yData, [new Pair('温度', '℃'), new Pair('湿度', '%')]);
    return (
      <div>
        <AxisChart data={data}/>
      </div>
    );
  }
}

export default Dashboard;