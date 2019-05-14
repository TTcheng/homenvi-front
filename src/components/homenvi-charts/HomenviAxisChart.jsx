import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {Button, Checkbox, Col, Input, Row, Select, InputNumber} from "antd";

import AxisChart from "../charts/AxisChart";
import SqlHelper from "../../utils/SqlHelper";
import ChartData, {TimeSeriesChartData} from "../../model/chart-data";
import {AllHomenviDataTypes, BaseConstants} from '../../utils/Constants'
import {daysBetween, nMonthsAgo} from "../../utils/DateTimeUtils";
import "./Chart.css"

const Option = Select.Option;

const allChecks = AllHomenviDataTypes.map(value => (value.name));
const defaultChecked = [allChecks[0], allChecks[1]];

class HomenviAxisChart extends Component {
  static propTypes = {
    fetchEChartsData: PropTypes.func.isRequired,
    chartsData: PropTypes.oneOfType([ChartData, TimeSeriesChartData]),
    options: PropTypes.object.isRequired,
  };

  state = {
    checked: defaultChecked,
    input: 1,
    select: 'hour',
  };

  constructor(props) {
    super(props);
  }

  fetchData = () => {
    const checkedTypes = [];
    this.state.checked.forEach((check) => {
      for (let type of AllHomenviDataTypes) {
        if (check === type.name) {
          checkedTypes.push(type);
          break;
        }
      }
    });
    let fields = checkedTypes.map(type => (type.field));
    fields = this.meanFields(fields);
    const condition = this.getTimeCondition();
    const sql = SqlHelper.query(fields, 'collections', condition, this.getGroups());
    let params = [sql, '监测数据折线图', checkedTypes.map(type => (type.nameUnit))];
    const {fetchEChartsData} = this.props;
    fetchEChartsData(...params);
  };

  /**
   * 使用聚合函数mean()以支持分组
   * @param fields
   * @returns {*}
   */
  meanFields = (fields) => {
    const {input, select} = this.state;
    if (select === 'hour' && input < 2) {
      return fields;
    }
    return fields.map(field => (`round(mean(${field}))`))
  };

  getTimeCondition = () => {
    const {input, select} = this.state;
    let condition = 'time>now()-';
    switch (select) {
      case "hour":
        condition += `${input}h`;
        break;
      case "day":
        condition += `${input}d`;
        break;
      case "month":
        const days = daysBetween(nMonthsAgo(input));
        condition += `${days}d`;
        break;
    }
    return [condition];
  };

  getGroups = () => {
    let {select, input} = this.state;
    if (select === 'hour' && input < 2) {
      return null; // 小于1小时不分组
    }
    let hours = 1;
    switch (select) {
      case "hour":
        hours = input;
        break;
      case "day":
        hours = input * 24;
        break;
      case "month":
        hours = input * 24 * 30;
        break;
    }
    let duration = hours * BaseConstants.CollectDuration;
    // 分组结果大约为720条数据
    return [`time(${duration}s)`];
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

  onCheck = (checkedList) => {
    this.setState({
      checked: checkedList,
    });
    setTimeout(this.fetchData, 100);
  };

  onSelect = (selected) => {
    this.setState({select: selected})
  };

  onInput = (value) => {
    this.setState({input: value})
  };

  render() {
    return (
      <div>
        <AxisChart data={this.props.chartsData}/>
        <div>
          <Input.Group>
            <Row>
              <Col span={16}>
                <Checkbox.Group options={allChecks} value={this.state.checked} onChange={this.onCheck}/>
              </Col>
              <Col span={8}>
                <InputNumber size={"small"} min={1} max={999} precision={0} onChange={this.onInput}
                             defaultValue={this.state.input}/>
                <Select size={"small"} defaultValue={this.state.select} style={{width: 120}} onChange={this.onSelect}>
                  <Option value="hour">小时</Option>
                  <Option value="day">天</Option>
                  <Option value="month">月</Option>
                </Select>
                <Button onClick={this.fetchData} size={"small"} type={"primary"} htmlType={'button'}>
                  确定
                </Button>
              </Col>
            </Row>
          </Input.Group>
        </div>
      </div>
    );
  }
}

export default HomenviAxisChart;