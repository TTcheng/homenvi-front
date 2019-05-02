export default class AxisChartData {
  type = 'category';
  title = '';
  xAxisData = [];
  seriesData = [];
  nameUnitPairs = []; // 名称和单位

  constructor(title, xAxisData, seriesData, nameUnitPairs) {
    this.title = title;
    this.xAxisData = xAxisData;
    this.seriesData = seriesData;
    this.nameUnitPairs = nameUnitPairs;
  }
}

export class TimeSeriesChartData extends AxisChartData {
  type = 'time';

  constructor(title, nameUnitPairs, seriesData) {
    super(title, null, seriesData, nameUnitPairs);
  }
}