export default class AxisChartData {
  title = '';
  xAxisData = [];
  yAxisData = [];
  nameUnitPairs = []; // 名称和单位

  constructor(title, xAxisData, yAxisData, nameUnitPairs) {
    this.title = title;
    this.xAxisData = xAxisData;
    this.yAxisData = yAxisData;
    this.nameUnitPairs = nameUnitPairs;
  }
}