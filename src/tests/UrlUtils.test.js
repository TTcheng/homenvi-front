import {encodeUrlData, setUrlParams} from "../utils/UrlUtils";

test('encode', () => {
  let res = encodeUrlData({a: 1, b: 2});
  expect(res).toEqual('a=1&b=2');
  console.log(res)
});

test('match URL param', () => {
  const pattern = /:\w+/g;
  let url = `http://localhost/:tenantId/:userid`;
  let matches = url.match(pattern);
  expect(matches).toEqual([':tenantId',':userid']);
});

test('setUrlParam', ()=>{
  const url = `http://localhost/:tenantId/:userid`;
  let res = setUrlParams(url, {tenantId:12,userid:13});
  expect(res).toEqual(`http://localhost/12/13`)
});