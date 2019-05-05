import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import ReactEcharts from "echarts-for-react";
import moment from "moment";
import {DatePicker} from "antd";

import {CalendarData} from "../../model/chart-data";
import {HomenviDataTypes} from "../../utils/Constants";
import SqlHelper from "../../utils/SqlHelper";
import {cnMonth} from "../../utils/CalendarUtils";

const {celsius} = HomenviDataTypes;
const {MonthPicker} = DatePicker;

class MonthTempChart extends Component {
  static propTypes = {
    data: PropTypes.instanceOf(CalendarData),
    fetchEChartsData: PropTypes.func.isRequired,
  };

  state = {
    month: moment().month(),
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const type = celsius;
    const fields = [`round(mean(${type.field}))`];
    const startTime = this.startOfMonth().toDate().getTime() * 1000000;
    const endTime = this.endOfMonth().toDate().getTime() * 1000000;
    const condition = [`time>${startTime}`, `time<${endTime}`];
    const sql = SqlHelper.query(fields, 'collections', condition, ['time(1d)']);
    this.props.fetchEChartsData(sql, `${cnMonth(this.state.month)}每天平均${type.name}热力图`, type.nameUnit);
  };

  startOfMonth = () => {
    const {month} = this.state;
    return moment().month(month).startOf('month');
  };

  endOfMonth = () => {
    const {month} = this.state;
    return moment().month(month).endOf('month');
  };

  getOption = () => {
    const {title, month, nameUnit, seriesData} = this.props.data;
    return {
      title: {
        top: 30,
        left: '',
        text: title
      },
      tooltip: {
        trigger: 'item',
        formatter: function (item) {
          let {value} = item;
          return `${value[1]}${nameUnit.value}, ${value[0]}`;
        }
      },
      visualMap: [{
        min: -60,
        max: 60,
        calculable: true,
        orient: 'vertical',
        left: '25%',
        inRange: {
          color: ['#5291ff', '#FFF', 'red'],
        },
        top: 30,
        formatter: (value) => {
          return `${Math.round(value)}${nameUnit.value}`
        }
      }
      ],
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      calendar: {
        orient: 'vertical',
        yearLabel: {
          margin: 40
        },
        dayLabel: {
          firstDay: 1,
          nameMap: 'cn'
        },
        monthLabel: {
          nameMap: 'cn',
          margin: 20
        },
        cellSize: 40,
        left: 'center',
        range: month
      },
      series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: seriesData
      }
    };
  };

  onMonthPick = (date, dateString) => {
    const month = Number.parseInt(dateString.split('-')[1]);
    this.setState({month: month - 1});
    setTimeout(this.fetchData, 100);
  };

  render() {
    if (!this.props.data) {
      return null;
    }
    let option = this.getOption();
    return (
      <div className='parent'>
        <ReactEcharts
          notMerge={true}
          option={option}
          style={{height: '350px', width: '100%'}}
          className='react_for_echarts'/>
        <div>
          <MonthPicker
            defaultValue={this.startOfMonth()}
            defaultPickerValue={this.startOfMonth()}
            onChange={this.onMonthPick}/>
        </div>
      </div>
    );
  }
}

export default MonthTempChart;