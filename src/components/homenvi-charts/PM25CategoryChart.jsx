import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import ReactEcharts from "echarts-for-react";
import {DatePicker} from "antd";
import moment from 'moment';

import {HomenviDataTypes} from '../../utils/Constants'
import SqlHelper from "../../utils/SqlHelper";

const {dustDensity} = HomenviDataTypes;
const {RangePicker} = DatePicker;

class Pm25CategoryChart extends Component {
  static propTypes = {
    fetchCategoryData: PropTypes.func.isRequired,
    data: PropTypes.object,
  };

  state = {
    start: moment().month(moment().month() - 1),
    end: moment(),
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const {start, end} = this.state;
    const startTime = start.toDate().getTime() * 1000000;
    const endTime = end.toDate().getTime() * 1000000;
    const sql = SqlHelper.query(
      [`round(mean(${dustDensity.field}))`],
      'collections',
      [`time>${startTime}`, `time<${endTime}`],
      ['time(1d)']
    );
    this.props.fetchCategoryData(sql, dustDensity, 'PM2.5与污染状况一览图')
  };

  getOption = () => {
    const schema = [
      {name: 'date', index: 0, text: '日期'},
      {name: 'PM25', index: 1, text: 'PM2.5'},
      {name: '等级', index: 2, text: '等级'}
    ];

    const {title, seriesData} = this.props.data;
    return {
      title: {
        top: 30,
        left: '',
        text: title
      },
      legend: {
        bottom: 30,
        data: [dustDensity.name],
        itemGap: 20,
        textStyle: {
          fontSize: 14
        }
      },
      parallelAxis: [
        {dim: 0, name: schema[0].text, inverse: true, nameLocation: 'start', type: 'category'},
        {dim: 1, name: schema[1].text, min: 0, max: 250},
        {
          dim: 2, name: schema[2].text,
          type: 'category', data: dustDensity.categories.reverse()
        }
      ],
      visualMap: {
        show: true,
        min: 0,
        max: 300,
        dimension: 1,
        inRange: {
          color: ['#f00', '#ff0', '#0f0'].reverse(),
        }
      },
      parallel: {
        left: '5%',
        right: '18%',
        bottom: 100,
        parallelAxisDefault: {
          type: 'value',
          name: dustDensity.name,
          nameLocation: 'end',
          nameGap: 20,
          nameTextStyle: {
            fontSize: 12
          },
        }
      },
      series: [{
        name: dustDensity.name,
        type: 'parallel',
        lineStyle: {
          normal: {
            width: 1,
            opacity: 0.5
          }
        },
        data: seriesData
      }]
    };
  };

  onRangePick = (dates) => {
    this.setState({start: dates[0], end: dates[1]});
    setTimeout(this.fetchData, 100)
  };

  render() {
    if (!this.props.data) {
      return null
    }
    const option = this.getOption();
    const {start, end} = this.state;
    return (
      <div className='parent'>
        <ReactEcharts
          notMerge={true}
          option={option}
          style={{height: '350px', width: '100%'}}
          className='react_for_echarts'/>
        <div>
          <RangePicker defaultPickerValue={[start, end]} defaultValue={[start, end]} onChange={this.onRangePick}/>
        </div>
      </div>
    );
  }
}


export default Pm25CategoryChart;