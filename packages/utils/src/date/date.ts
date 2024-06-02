import dayjs from 'dayjs';

export const addDayToDate = (date: Date, numberOfDay: number): Date => {
  return dayjs(date).add(numberOfDay, 'days').toDate();
};
