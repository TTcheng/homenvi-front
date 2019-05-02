import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {Checkbox, Row} from "antd";

import AxisChart from "../charts/AxisChart";
import Pair from "../../model/pair";
import SqlHelper from "../../utils/SqlHelper";
import AxisChartData, {TimeSeriesChartData} from "../../model/axis-chart-data";
import {HomenviDataTypes} from '../../utils/Constants'
import {arrayOfObjProps} from "../../utils/ArrayUtils";

const homenviDataTypeArr = arrayOfObjProps(HomenviDataTypes);
const allChecks = homenviDataTypeArr.map(value => (value.name));
const defaultChecked = [allChecks[0], allChecks[1]];

class HomenviAxisChart extends Component {
  static propTypes = {
    fetchEChartsData: PropTypes.func.isRequired,
    chartsData: PropTypes.oneOfType([AxisChartData, TimeSeriesChartData]),
    options: PropTypes.object.isRequired,
  };

  state = {
    checked: defaultChecked,
  };

  constructor(props) {
    super(props);
  }

  fetchData = () => {
    const checkedTypes = [];
    this.state.checked.forEach((check) => {
      for (let type of homenviDataTypeArr) {
        if (check === type.name) {
          checkedTypes.push(type);
          break;
        }
      }
    });
    this.sql = SqlHelper.query(
      checkedTypes.map(type => (type.field)),
      // ['round(mean(humidity)) as humidity', 'round(mean(celsius)) as celsius'],
      'collections',
      ['time>now()-1h'],
      null,
      [new Pair('time', 'desc')]
    );
    let params = [this.sql, '监测数据折线图', checkedTypes.map(type => (type.nameUnit))];
    const {fetchEChartsData} = this.props;
    fetchEChartsData(...params);
  };

  componentDidMount() {
    this.fetchData();
    const {options} = this.props;
    if (options.autoRefresh) {
      let interval = setInterval(() => {
        this.fetchData();
      }, options.timeout);
      this.setState({interval})
    }
  }

  componentWillUnmount() {
    if (this.props.options.autoRefresh) {
      clearInterval(this.state.interval)
    }
  }

  onChange = (checkedList) => {
    this.setState({
      checked: checkedList,
    });
    setTimeout(this.fetchData, 100);
  };

  render() {
    return (
      <div>
        <AxisChart data={this.props.chartsData}/>
        <div>
          <Row>
            <Checkbox.Group options={allChecks} value={this.state.checked} onChange={this.onChange}/>
          </Row>
        </div>
      </div>
    );
  }
}

export default HomenviAxisChart;