import UrlDataEncoder from "./UrlDataEncoder";

test('encode', ()=>{
  let res = UrlDataEncoder.encode({a:1,b:2});
  expect(res).toEqual('a=1&b=2');
  console.log(res)
});