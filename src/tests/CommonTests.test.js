import {setUrlParams} from "../utils/UrlUtils";

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

test('just &&', () => {
  let body;
  let res = body && JSON.stringify(body);
  expect(res).toEqual(body);

  body = {a: 1, b: 2};
  res = body && JSON.stringify(body);
  expect(res).toEqual(`{"a":1,"b":2}`)
});