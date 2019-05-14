import React, {Component} from 'react';
import {
  AxisChartProvider,
  CalendarChartProvider,
  GaugeChartProvider,
  PM25ChartProvider,
  StatisticProvider
} from "./ContainerProvider";
import {Col, Row, Divider} from "antd";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <StatisticProvider/>
        <div>
          <Row>
            <Col span={8}>
              <CalendarChartProvider/>
            </Col>
            <Col span={8}>
              <GaugeChartProvider/>
            </Col>
            <Col span={8}>
              <PM25ChartProvider/>
            </Col>
          </Row>
        </div>
        <Divider style={{'borderBottom': '2px solid rgba(0,0,0,0.2)'}}/>
        <AxisChartProvider/>
      </div>
    );
  }
}

export default Dashboard;