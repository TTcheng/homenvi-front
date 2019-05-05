import {natureNumToChinese} from "../utils/NumberUtils";

test('test natureNumToChinese', () => {
  expect(natureNumToChinese(5000)).toEqual('五千');
  expect(natureNumToChinese(5005)).toEqual('五千零五');
  expect(natureNumToChinese(123456789)).toEqual('一亿二千三百四十五万六千七百八十九');
  expect(natureNumToChinese(100000000)).toEqual('一亿');
  expect(natureNumToChinese(10100000000)).toEqual('一百零一亿');
});