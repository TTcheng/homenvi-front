import {setUrlParams} from "../utils/UrlUtils";
import {delElem} from "../utils/ArrayUtils";

test('test mapping', () => {
  const dataBJ = [
    [1, 55, 9, 56, 0.46, 18, 6, "良"],
    [2, 25, 11, 21, 0.65, 34, 9, "优"],
    [3, 56, 7, 63, 0.3, 14, 5, "良"],
    [4, 33, 7, 29, 0.33, 16, 6, "优"],
    [5, 42, 24, 44, 0.76, 40, 16, "优"],
    [6, 82, 58, 90, 1.77, 68, 33, "良"],
    [7, 74, 49, 77, 1.46, 48, 27, "良"],
    [8, 78, 55, 80, 1.29, 59, 29, "良"],
    [9, 267, 216, 280, 4.8, 108, 64, "重度污染"],
    [10, 185, 127, 216, 2.52, 61, 27, "中度污染"],
    [11, 39, 19, 38, 0.57, 31, 15, "优"],
    [12, 41, 11, 40, 0.43, 21, 7, "优"],
    [13, 64, 38, 74, 1.04, 46, 22, "良"],
    [14, 108, 79, 120, 1.7, 75, 41, "轻度污染"],
    [15, 108, 63, 116, 1.48, 44, 26, "轻度污染"],
    [16, 33, 6, 29, 0.34, 13, 5, "优"],
    [17, 94, 66, 110, 1.54, 62, 31, "良"],
    [18, 186, 142, 192, 3.88, 93, 79, "中度污染"],
    [19, 57, 31, 54, 0.96, 32, 14, "良"],
    [20, 22, 8, 17, 0.48, 23, 10, "优"],
    [21, 39, 15, 36, 0.61, 29, 13, "优"],
    [22, 94, 69, 114, 2.08, 73, 39, "良"],
    [23, 99, 73, 110, 2.43, 76, 48, "良"],
    [24, 31, 12, 30, 0.5, 32, 16, "优"],
    [25, 42, 27, 43, 1, 53, 22, "优"],
    [26, 154, 117, 157, 3.05, 92, 58, "中度污染"],
    [27, 234, 185, 230, 4.09, 123, 69, "重度污染"],
    [28, 160, 120, 186, 2.77, 91, 50, "中度污染"],
    [29, 134, 96, 165, 2.76, 83, 41, "轻度污染"],
    [30, 52, 24, 60, 1.03, 50, 21, "良"],
    [31, 46, 5, 49, 0.28, 10, 6, "优"]
  ];
  const PM25 = dataBJ.map((item) => {
    return [item[0], item[2], item[7]]
  });
  console.debug(PM25);
  expect(PM25).not.toNull();
});

test('test del array elements', () => {
  let arr = [1, 3, 5];
  delElem(arr, 1);
  expect(arr).toEqual([3, 5]);
  delElem(arr, 5);
  expect(arr).toEqual([3]);
});

test('just test', () => {
  const origin = `http://localhost/:tenant/:user`;
  let data;
  let results = data ? setUrlParams(origin, data) : origin;
  expect(results).toEqual(origin);

  data = {tenant: 12, user: 13};
  results = data ? setUrlParams(origin, data) : origin;
  const expected = `http://localhost/12/13`;
  expect(results).toEqual(expected)
});

test('test map', () => {
  let arr = [1, 3, 5];
  let res = arr.map((item, index) => {
    return item + 3;
  });
  expect(res).toEqual([4, 6, 8])
});

test('just &&', () => {
  let body;
  let res = body && JSON.stringify(body);
  expect(res).toEqual(body);

  body = {a: 1, b: 2};
  res = body && JSON.stringify(body);
  expect(res).toEqual(`{"a":1,"b":2}`)
});