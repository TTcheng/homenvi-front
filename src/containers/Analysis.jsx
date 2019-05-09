import React, {Component} from 'react';
import {AxisChartProvider} from "./ContainerProvider";
// import {Row} from "antd";

class Analysis extends Component {
  render() {
    return (
      <div>
        {/*<div style={{background: '#fff', 'paddingBottom': '10px', 'borderBottom': '2px solid rgba(0,0,0,0.2)'}}>*/}
        {/*  <Row gutter={16}>*/}
        {/*  </Row>*/}
        {/*</div>*/}
        <AxisChartProvider/>
      </div>
    );
  }
}

export default Analysis;