import AxisChartData, {TimeSeriesChartData} from "../model/axis-chart-data";

export const resolveSingleQuery = (response, title = '', nameUnitPairs = []) => {
  let isTimeSeries = false;
  let series = response.results[0].series[0];
  let {values, columns} = series;
  if (columns[0] === 'time') {
    isTimeSeries = true;
  }
  let xData = [], seriesData = [], len = nameUnitPairs.length;
  for (let i = 0; i < len; i++) {
    seriesData.push({name: nameUnitPairs[i].name, data: []})
  }
  // time
  if (isTimeSeries) {
    values.forEach((value) => {
      for (let i = 0; i < len; i++) {
        seriesData[i].data.push([new Date(value[0]), value[i + 1]])
      }
    });
    return new TimeSeriesChartData(title, nameUnitPairs, seriesData);
  }
  // category
  values.forEach((value) => {
    xData.push(value[0]);
    for (let i = 0; i < len; i++) {
      seriesData[i].data.push(value[i + 1])
    }
  });
  return new AxisChartData(title, xData, seriesData, nameUnitPairs);
};