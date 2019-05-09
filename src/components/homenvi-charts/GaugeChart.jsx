import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import ReactEcharts from "echarts-for-react/lib/index";

import './Chart.css'
import {GaugeData} from "../../model/chart-data";
import SqlHelper from "../../utils/SqlHelper";
import {HomenviDataTypes} from "../../utils/Constants";
import {Select} from "antd";

const Option = Select.Option;
const {humidity, celsius, brightness, dustDensity, sound, gasValue} = HomenviDataTypes;
const masters = [humidity, celsius];
const slaves = [brightness, dustDensity];

class GaugeChart extends Component {
  static propTypes = {
    data: PropTypes.instanceOf(GaugeData),
    fetchData: PropTypes.func.isRequired,
  };

  state = {
    master: masters[0],
    slave: slaves[0],
  };

  getData = () => {
    const {master, slave} = this.state;
    const types = [master, slave, sound, gasValue,];
    let fields = types.map(value => (`last(${value.field}) as ${value.field}`));
    const sql = SqlHelper.query(fields, 'collections');
    this.props.fetchData(sql, types, '仪表盘')
  };

  componentDidMount() {
    this.getData();
    const interval = setInterval(() => {
      this.getData();
    }, 6000);
    this.setState({interval});
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)
  }

  getOption = () => {
    const {data} = this.props;
    if (!data) return null;
    const {seriesData} = data;
    let master = seriesData[0], slaveLeft = seriesData[1], slaveTopRight = seriesData[2],
      slaveBottomRight = seriesData[3];
    return {
      tooltip: {
        formatter: "{a} <br/>{c} {b}"
      },
      series: [
        {
          name: master.name,
          type: 'gauge',
          z: 3,
          min: master.min,
          max: master.max,
          splitNumber: 10,
          radius: '60%',
          axisLine: {            // 坐标轴线
            lineStyle: {       // 属性lineStyle控制线条样式
              width: 8
            }
          },
          axisTick: {            // 小刻度
            length: 12,        // 属性length控制线长
            lineStyle: {       // 属性lineStyle控制线条样式
              color: 'auto'
            }
          },
          splitLine: {           // 大刻度
            length: 15,         // 属性length控制线长
            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
              color: 'auto'
            }
          },
          axisLabel: {
            fontSize: 8,
            backgroundColor: 'auto',
            borderRadius: 2,
            color: '#eee',
            padding: 2,
            formatter: (value) => {
              if (value > 1000) {
                return `${value - 1000}k`
              }
              return value;
            }
          },
          pointer: {
            width: 5
          },
          title: {
            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            show: false,
            fontWeight: 'bolder',
            fontSize: 16,
            fontStyle: 'italic'
          },
          detail: {
            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            formatter: function (value) {
              value = (value + '').split('.');
              value.length < 2 && (value.push('00'));
              return ('00' + value[0]).slice(-2)
                + '.' + (value[1] + '00').slice(0, 2) + master.unit;
            },
            fontSize: 16,
          },
          data: [{value: master.value, name: master.unit}]
        },
        {
          name: slaveLeft.name,
          type: 'gauge',
          center: ['16%', '50%'],    // 默认全局居中
          radius: '40%',
          min: slaveLeft.min,
          max: slaveLeft.max,
          endAngle: 45,
          startAngle: 315,
          splitNumber: 5,
          axisLine: {            // 坐标轴线
            lineStyle: {       // 属性lineStyle控制线条样式
              width: 6
            }
          },
          axisTick: {            // 坐标轴小标记
            length: 10,        // 属性length控制线长
            lineStyle: {       // 属性lineStyle控制线条样式
              color: 'auto'
            }
          },
          splitLine: {           // 分隔线
            length: 12,         // 属性length控制线长
            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
              color: 'auto'
            }
          },
          axisLabel: {
            formatter: (value) => {
              if (value > 999) {
                return `${(Math.round(value / 1000))}k`
              }
              return value;
            }
          },
          pointer: {
            width: 3
          },
          title: {
            offsetCenter: [0, '-30%'],       // x, y，单位px
            fontSize: 10,
            fontStyle: 'italic'
          },
          detail: {
            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            fontWeight: 'bolder',
            fontSize: 12,
            formatter: (value) => {
              return `${value}${slaveLeft.unit}`
            }
          },
          data: [{value: slaveLeft.value, name: slaveLeft.unit}]
        },
        {
          name: slaveTopRight.name,
          type: 'gauge',
          center: ['83%', '50%'],    // 默认全局居中
          radius: '38%',
          min: slaveBottomRight.min,
          max: slaveBottomRight.max,
          startAngle: 135,
          endAngle: 45,
          splitNumber: 2,
          axisLine: {            // 坐标轴线
            lineStyle: {       // 属性lineStyle控制线条样式
              width: 6
            }
          },
          axisTick: {            // 坐标轴小标记
            splitNumber: 5,
            length: 8,        // 属性length控制线长
            lineStyle: {        // 属性lineStyle控制线条样式
              color: 'auto'
            }
          },
          axisLabel: {
            formatter: function (v) {
              switch (v + '') {
                case '' + slaveTopRight.min :
                  return '静';
                case '' + (slaveTopRight.min + slaveTopRight.max) / 2 :
                  return 'sound';
                case '' + slaveTopRight.max :
                  return '噪';
              }
            }
          },
          splitLine: {           // 分隔线
            length: 12,         // 属性length控制线长
            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
              color: 'auto'
            }
          },
          pointer: {
            width: 2
          },
          title: {
            show: false
          },
          detail: {
            show: false
          },
          data: [{value: slaveTopRight.value, name: slaveTopRight.unit}]
        },
        {
          name: slaveBottomRight.name,
          type: 'gauge',
          center: ['83%', '50%'],    // 默认全局居中
          radius: '38%',
          min: slaveBottomRight.min,
          max: slaveBottomRight.max,
          startAngle: 315,
          endAngle: 225,
          splitNumber: 2,
          axisLine: {            // 坐标轴线
            lineStyle: {       // 属性lineStyle控制线条样式
              width: 6
            }
          },
          axisTick: {            // 坐标轴小标记
            show: false
          },
          axisLabel: {
            formatter: function (v) {
              switch (v + '') {
                case '' + slaveBottomRight.min :
                  return 'L';
                case '' + (slaveBottomRight.min + slaveBottomRight.max) / 2 :
                  return 'gas';
                case '' + slaveBottomRight.max :
                  return 'H';
              }
            }
          },
          splitLine: {           // 分隔线
            length: 12,         // 属性length控制线长
            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
              color: 'auto'
            }
          },
          pointer: {
            width: 2
          },
          title: {
            show: false
          },
          detail: {
            show: false
          },
          data: [{value: slaveBottomRight.value, name: slaveBottomRight.unit}]
        }
      ]
    };

  };

  onMasterSelect = (selected) => {
    for (const master of masters) {
      if (selected === master.field) {
        this.setState({master});
        setTimeout(this.getData, 100);
        break;
      }
    }
  };

  onSlaveSelect = (selected) => {
    for (const slave of slaves) {
      if (selected === slave.field) {
        this.setState({slave});
        setTimeout(this.getData, 100);
        break;
      }
    }
  };

  render() {
    const {data} = this.props;
    if (!data) {
      return null;
    }
    let option = this.getOption();
    const {title} = data;
    return (
      <div className='parent'>
        <div className="title center">{title}</div>
        <ReactEcharts
          notMerge={true}
          option={option}
          lazyUpdate={true}
          style={{height: '350px', width: '100%'}}
          className='react_for_echarts'/>
        <div className={"center"}>
          <label className="plain-text">副表盘：</label>
          <Select style={{width: '120px'}} size={"default"} defaultValue={"brightness"} onSelect={this.onSlaveSelect}>
            <Option value="brightness">光线强度</Option>
            <Option value="dustDensity">{"PM2.5浓度"}</Option>
          </Select>
          <label style={{marginLeft: '20px'}} className="plain-text">主表盘：</label>
          <Select size={"default"} defaultValue={"humidity"} onSelect={this.onMasterSelect}>
            <Option value="humidity">湿度</Option>
            <Option value="celsius">温度</Option>
          </Select>
        </div>
      </div>
    );
  }
}

export default GaugeChart;