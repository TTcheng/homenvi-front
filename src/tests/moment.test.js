import moment from 'moment'

test('test create moment', () => {
  let aMoment = moment(new Date().getTime() - 1000 * 60 * 60).month(3);
  console.debug(aMoment.toLocaleString());
  expect(aMoment).not.toBeNull();
});

test('test moment', () => {
  let march = moment().month(2);
  let days = daysBetween(march.toDate());
  console.debug(march);
  console.debug(days);
  expect(march).not.toBeNull();
});

test('test milliseconds', () => {
  let now = moment();
  expect(now.unix() * 1000 + now.milliseconds()).toEqual(now.toDate().getTime());
});

test('test month', () => {
  let now = moment();
  expect(now.month()).toEqual(4);
});