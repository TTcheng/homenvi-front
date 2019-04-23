import Pair from "../model/pair";

test('pair tests', () => {
  let pair = new Pair('温度','℃');

  expect(pair.name).toEqual('温度');
  expect(pair.value).toEqual('℃');
});