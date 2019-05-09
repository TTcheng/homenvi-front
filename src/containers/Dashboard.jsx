import React, {Component} from 'react';
import {
  CalendarChartProvider,
  GaugeChartProvider,
  PM25ChartProvider,
  StatisticProvider
} from "./ContainerProvider";
import {Col, Row} from "antd";

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
      </div>
    );
  }
}

export default Dashboard;