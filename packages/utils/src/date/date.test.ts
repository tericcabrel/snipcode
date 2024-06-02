import { addDayToDate } from './date';

describe('TesT addDayToDate', () => {
  it('should add the correct number of days to the current date', () => {
    const date = new Date(2024, 5, 1, 10, 45, 30);
    const numberOfDaysToAdd = 5;

    const result = addDayToDate(date, numberOfDaysToAdd);

    const expectedDate = new Date(2024, 5, 6, 10, 45, 30);

    expect(result).toEqual(expectedDate);
  });

  it('should return the current date when no days are added', () => {
    const date = new Date(2024, 5, 1, 10, 45, 30);
    const numberOfDaysToAdd = 0;

    const result = addDayToDate(date, numberOfDaysToAdd);

    const expectedDate = new Date(2024, 5, 1, 10, 45, 30);

    expect(result).toEqual(expectedDate);
  });

  it('should handle negative numbers correctly', () => {
    const date = new Date(2024, 5, 2, 10, 45, 30);
    const numberOfDaysToAdd = -3;

    const result = addDayToDate(date, numberOfDaysToAdd);

    const expectedDate = new Date(2024, 4, 30, 10, 45, 30);

    expect(result).toEqual(expectedDate);
  });
});
