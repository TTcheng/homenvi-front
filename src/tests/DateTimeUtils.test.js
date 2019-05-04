import {daysBetween, nMonthsAgo} from "../utils/DateTimeUtils";

test('test nMonthsAgo', () => {
  let _13MonthAgo = nMonthsAgo(13);
  const days = daysBetween(_13MonthAgo);
  console.debug(days);
  expect(days).toEqual(395);
});

test('test daysBetween', () => {
  let lastDay = new Date('2019-5-2 16:40');
  const days = daysBetween(lastDay);
  console.debug(days);
  expect(lastDay).not.toBeNull();
});