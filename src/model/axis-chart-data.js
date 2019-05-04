export default class AxisChartData {
  type = 'category';
  title = '';
  xAxisData = [];
  seriesData = []; // array of SeriesItem
  nameUnitPairs = []; // 名称和单位

  constructor(title, xAxisData, seriesData, nameUnitPairs) {
    this.title = title;
    this.xAxisData = xAxisData;
    this.seriesData = seriesData;
    this.nameUnitPairs = nameUnitPairs;
  }
}

export class SeriesItem {
  name = '';
  data = [];
  min;
  max;

  constructor(name, data, min = 99999, max = -99999) {
    this.name = name;
    this.data = data;
    this.min = min;
    this.max = max;
  }
}

export class TimeSeriesChartData extends AxisChartData {
  type = 'time';

  constructor(title, nameUnitPairs, seriesData) {
    super(title, null, seriesData, nameUnitPairs);
  }
}