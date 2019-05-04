import moment from 'moment'
import {daysBetween} from "../utils/DateTimeUtils";

test('test moment', () => {
  let march =  moment().month(2);
  let days = daysBetween(march.toDate());
  console.debug(march);
  console.debug(days);
  expect(march).not.toBeNull();
});