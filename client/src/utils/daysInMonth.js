import moment from 'moment';

export const daysInMonth = (month, year) => {
  // Here January is 1 based
  //Day 0 is the last day in the previous month
  return new Date(year, month, 0).getDate();
  // Here January is 0 based
  // return new Date(year, month+1, 0).getDate();
};

export const yearsList = () => {
  let i;
  let currentYear = new Date().getFullYear();
  let previousYear = currentYear - 120;
  const YEARS = [''];
  for (i = previousYear; i <= currentYear; i++) {
    if (YEARS.indexOf(i) === -1) {
      YEARS.push(i);
    }
  }
  return YEARS;
};

export const dateFormatter = (date, format) => {
  return moment(new Date(date)).format(format);
};
