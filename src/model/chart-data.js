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

export class CalendarData {
  title = '';
  seriesData = []; // array of {date,value}
  nameUnit; // 名称和单位
  month = '2019-05';

  constructor(title, seriesData, nameUnit, month) {
    this.title = title;
    this.seriesData = seriesData;
    this.nameUnit = nameUnit;
    this.month = month;
  }
}

export class CategoryData {
  title = '';
  seriesData = []; // array of {date,value,category}
  nameUnit; // 名称和单位


  constructor(title, seriesData, nameUnit) {
    this.title = title;
    this.seriesData = seriesData;
    this.nameUnit = nameUnit;
  }
}