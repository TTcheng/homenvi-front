import {arrayToString, reverse, toCharArray} from "../utils/StringUtils";

test('test conversion of string and array', () => {
  const hello = 'hello';
  const helloArr = ['h', 'e', 'l', 'l', 'o'];
  expect(toCharArray(hello)).toEqual(helloArr);
  expect(arrayToString(helloArr)).toEqual(hello);
});


test('test reverse', () => {
  const hello = 'hello';
  expect(reverse(hello)).toEqual('olleh');
});
