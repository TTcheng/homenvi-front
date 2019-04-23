import React, {PureComponent} from 'react';
import ReactEcharts from 'echarts-for-react';
import * as PropTypes from 'prop-types';

import './AxisChart.css';
import AxisChartData from "../../model/axis-chart-data";

export default class AxisChart extends PureComponent {
  static propTypes = {
    data: PropTypes.instanceOf(AxisChartData).isRequired,
  };

  resolveSeries = (yAxisData, nameUnits) => {
    let res = [];
    yAxisData.forEach((item, index) => {
      let series = {
        name: '温度',
        type: 'line',
        stack: '总量',
        yAxisIndex: 0,
        areaStyle: {normal: {}},
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

  resolveNames = (nameUnits) => {
    let names = [];
    nameUnits.forEach((value) => {
      names.push(value.name);
    });
    return names
  };

  resolveYAxis = (nameUnits) => {
    let yAxis = [];
    nameUnits.forEach((nameUnit) => {
      let cur = {
        name: '温度',
        type: 'value',
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

    const {title, xAxisData, yAxisData, nameUnitPairs} = this.props.data;
    return {
      title: {
        text: title + '堆叠区域图'
      },
      tooltip: {
        trigger: 'axis',
        formatter: (seriesArr) => {
          let relVal = "";
          seriesArr.forEach((series) => {
            relVal += `${series.seriesName} : ${series.value}`;
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
        data: this.resolveNames(nameUnitPairs)
        //['湿度', '温度', '体感温度']
      },
      toolbox: {
        feature: {
          saveAsImage: {name: title}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: xAxisData
        }
      ],
      yAxis: this.resolveYAxis(nameUnitPairs),
      series: this.resolveSeries(yAxisData, nameUnitPairs),
    };
  };

  render() {

    return (
      <div className='examples'>
        <div className='parent'>
          <ReactEcharts
            option={this.getOption()}
            style={{height: '350px', width: '100%'}}
            className='react_for_echarts'/>
        </div>
      </div>
    );
  }
}
