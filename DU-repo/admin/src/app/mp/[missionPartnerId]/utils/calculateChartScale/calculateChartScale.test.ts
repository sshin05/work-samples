import { calculateChartScale } from './calculateChartScale';

describe('calculateChartScale', () => {
  it('should return the value when max is less than 100', () => {
    const percentages = [20, 50, 80];
    const multiple = 10;
    expect(calculateChartScale(percentages, multiple)).toBe(90);
  });
  it('should return 100 when max is greater than 100', () => {
    const percentages = [20, 50, 90];
    const multiple = 10;
    expect(calculateChartScale(percentages, multiple)).toBe(100);
  });

  it('should return 100 when largest percentage is 0', () => {
    const percentages = [0, 0, 0];
    const multiple = 10;
    expect(calculateChartScale(percentages, multiple)).toBe(100);
  });

  it('should return correct scale for single array of percentages', () => {
    const percentages = [20, 50, 80];
    const multiple = 10;
    expect(calculateChartScale(percentages, multiple)).toBe(90);
  });

  it('should return correct scale for nested arrays of percentages', () => {
    const percentages = [[20, 50], [80]];
    const multiple = 10;
    expect(calculateChartScale(percentages, multiple)).toBe(90);
  });

  it('should return correct scale for different multiple', () => {
    const percentages = [20, 50, 80];
    const multiple = 20;
    expect(calculateChartScale(percentages, multiple)).toBe(100);
  });
});
