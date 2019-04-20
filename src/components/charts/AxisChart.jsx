import React, {PureComponent} from 'react';
import ReactEcharts from 'echarts-for-react';

import './AxisChart.css'

export default class AxisChart extends PureComponent {
  getOption = () => {
    return {
      title: {
        text: '堆叠区域图'
      },
      tooltip: {
        trigger: 'axis',
        formatter: (seriesArr) =>{
          let relVal = "";
          seriesArr.forEach((series) => {
            relVal += `${series.seriesName} : ${series.value}`;
            if (series.seriesName === '湿度') {
              relVal += '%'
            } else {
              relVal += '℃';
            }
            relVal += '<br/>'
          });
          return relVal;
        },
      },
      legend: {
        data: ['湿度', '温度', '体感温度']
      },
      toolbox: {
        feature: {
          saveAsImage: {name: '温湿度'}
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
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
      ],
      yAxis: [
        {
          name: '温度℃',
          type: 'value',
        }, {
          name: '湿度%',
          type: 'value',
        }
      ],
      series: [
        {
          name: '湿度',
          type: 'line',
          stack: '总量',
          yAxisIndex: 1,
          areaStyle: {normal: {}},
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '温度',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '体感温度',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data: [150, 232, 201, 154, 190, 330, 410]
        }
      ]
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
