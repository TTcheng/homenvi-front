import {arrayOfObjProps} from "../utils/ArrayUtils";


test('test del array elements', () => {
  const arr = [1,3,5];
  const object = {a:1,b:3,c:5};
  const objectProps = arrayOfObjProps(object);
  expect(objectProps).toEqual(arr);
});