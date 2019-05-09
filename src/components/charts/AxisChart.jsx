import React, {PureComponent} from 'react';
import ReactEcharts from 'echarts-for-react';
import * as PropTypes from 'prop-types';

import './Chart.css';
import ChartData, {TimeSeriesChartData} from "../../model/chart-data";

export default class AxisChart extends PureComponent {
  static propTypes = {
    data: PropTypes.oneOfType([ChartData, TimeSeriesChartData]),
  };

  resolveSeries = (seriesData, nameUnits) => {
    let res = [];
    seriesData.forEach((item, index) => {
      let series = {
        name: '温度',
        type: 'line',
        yAxisIndex: 0,
        showSymbol: false,
        data: [120, 132, 101, 134, 90, 230, 210]
      };
      series.data = item.data;
      series.name = item.name;
      nameUnits.forEach((value, index) => {
        if (series.name === value.name) {
          series.yAxisIndex = index;
        }
      });
      res[index] = series;
    });
    return res;
  };

  resolveXAxis = () => {
    let {data} = this.props;
    if (data.type === 'time') {
      return {
        type: 'time',
        splitLine: {
          show: false
        }
      }
    }
    return [{
      type: 'category',
      boundaryGap: false,
      data: data.xAxisData
    }]
  };

  resolveYAxis = (seriesData, nameUnits) => {
    let yAxis = [];
    nameUnits.forEach((nameUnit, index) => {
      let cur = {
        name: '温度',
        type: 'value',
        splitLine: {
          show: false
        },
        min: Math.floor(seriesData[index].min - 5),
        max: Math.floor(seriesData[index].max + 5),
        axisLabel: {
          formatter: `{value} ${nameUnit.value}`, // 格式化纵坐标刻度值 25℃
        }
      };
      cur.name = nameUnit.name;
      yAxis.push(cur);
    });
    return yAxis;
  };

  getOption = () => {

    const {type, title, seriesData, nameUnitPairs} = this.props.data;
    return {
      title: {
        text: title + '折线图',
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        formatter: (seriesArr) => {
          let relVal = "";
          seriesArr.forEach((series) => {
            if (type === 'time') {
              let timestamp = series.value[0], value = series.value[1];
              relVal += `${timestamp.toLocaleString()} ${series.seriesName} : ${value}`;
            } else {
              relVal += `${series.seriesName} : ${series.value}`;
            }
            nameUnitPairs.forEach((nameUnit) => {
              if (series.seriesName === nameUnit.name) {
                relVal += nameUnit.value;
                relVal += '<br/>';
              }
            });
          });
          return relVal;
        },
      },
      legend: {
        data: nameUnitPairs.map(nameUnit => (nameUnit.name))
        //['湿度', '温度', '体感温度']
      },
      toolbox: {
        feature: {
          saveAsImage: {name: title}
        }
      },
      // 支持横向缩放
      dataZoom: [
        {
          type: 'slider',
          show: true,
          xAxisIndex: 0,
          start: 94,
          end: 100,
          handleSize: 8
        },
        {
          type: 'inside',
          xAxisIndex: 0,
          filterMode: 'empty'
        },
      ],
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: this.resolveXAxis(),
      yAxis: this.resolveYAxis(seriesData, nameUnitPairs),
      series: this.resolveSeries(seriesData, nameUnitPairs),
    };
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
      </div>
    );
  }
}
