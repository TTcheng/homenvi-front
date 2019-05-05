import ChartData, {TimeSeriesChartData, SeriesItem, CalendarData} from "../model/chart-data";

export const resolveSingleQuery = (response, title = '', nameUnitPairs = []) => {
  let isTimeSeries = false;
  let series = response.results[0].series[0];
  let {values, columns} = series;
  if (columns[0] === 'time') {
    isTimeSeries = true;
  }
  let xData = [], seriesData = [], len = nameUnitPairs.length;
  for (let i = 0; i < len; i++) {
    seriesData.push(new SeriesItem(nameUnitPairs[i].name, []));
  }
  // time
  if (isTimeSeries) {
    values.forEach((value) => {
      for (let i = 0; i < len; i++) {
        const valueI = value[i + 1];
        seriesData[i].data.push([new Date(value[0]), valueI]);
        if (seriesData[i].min > valueI) {
          seriesData[i].min = valueI;
        }
        if (seriesData[i].max < valueI) {
          seriesData[i].max = valueI;
        }
      }
    });
    return new TimeSeriesChartData(title, nameUnitPairs, seriesData);
  }
  // category
  values.forEach((value) => {
    xData.push(value[0]);
    for (let i = 0; i < len; i++) {
      const thisValue = value[i + 1];
      seriesData[i].data.push(thisValue);
      if (seriesData[i].min > thisValue) {
        seriesData[i].min = thisValue;
      }
      if (seriesData[i].max < thisValue) {
        seriesData[i].max = thisValue;
      }
    }
  });
  return new ChartData(title, xData, seriesData, nameUnitPairs);
};

export const resolveCalendarData = (response, title, nameUnit) => {
  const series = response.results[0].series[0];
  const {values} = series;
  let seriesData = [];
  let dayOfMonth = new Date(values[5][0]).toISOString().split('T')[0];
  const month = dayOfMonth.substring(0, dayOfMonth.lastIndexOf('-'));
  values.forEach(value => {
    let time = value[0];
    let date = new Date(time).toISOString().split('T')[0];
    seriesData.push([date, value[1]])
  });
  return new CalendarData(title, seriesData, nameUnit, month);
};