import moment from 'moment'

export const daysBetween = (start, end = new Date()) => {
  if (!start) {
    throw new Error('start date should be defined');
  }
  if (!start instanceof Date || !end instanceof Date) {
    throw new Error('Type of input params should be Date');
  }
  const duration = end.getTime() - start.getTime();
  if (duration < 0) {
    throw new Error('The start time should be earlier than the end time.')
  }
  return Math.floor(duration / (1000 * 60 * 60 * 24));
};

export const nMonthsAgo = (n) => {
  const now = moment();
  let year = now.year();
  const curMonthIndex = now.month();
  if (n > 12) {
    year -= Math.floor(n / 12);
    n %= 12;
  }

  let targetMonthIndex;
  if (curMonthIndex >= n) {
    targetMonthIndex = curMonthIndex - n;
  } else {
    targetMonthIndex = curMonthIndex + 12 - n;
  }

  return now.year(year).month(targetMonthIndex).toDate();
};