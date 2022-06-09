import dayjs from 'dayjs';

export const addDayToDate = (numberOfDay: number): Date => {
  return dayjs().add(numberOfDay, 'days').toDate();
};
