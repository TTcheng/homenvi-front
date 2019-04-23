import AxisChartData from "../model/axis-chart-data";
import Pair from "../model/pair";

test('pair tests', () => {
  let xData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  let yData = [];
  yData.push({
    name: '温度',
    data: [15, 17, 19, 22, 21, 18, 16]
  });

  yData.push({
    name: '湿度',
    data: [25, 27, 30, 34, 29, 31, 16]
  });

  let data = new AxisChartData('温度曲线图', xData, yData, [new Pair('温度', '℃'), new Pair('湿度', '%')]);
  const {title, xAxisData, yAxisData, nameUnitPairs} = data;

  expect(nameUnitPairs[0].value).toEqual('℃');
  expect(title).toEqual('温度曲线图');
  expect(xData).toEqual(xAxisData);
  expect(yData).toEqual(yAxisData);
});