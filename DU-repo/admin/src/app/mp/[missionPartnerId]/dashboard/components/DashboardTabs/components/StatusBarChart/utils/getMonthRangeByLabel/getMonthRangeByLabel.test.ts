import { getMonthRangeByLabel } from './getMonthRangeByLabel';

describe('getMonthRangeByLabel', () => {
  it('should return "Jan-Mar" when label includes "Q1"', () => {
    expect(getMonthRangeByLabel('Q1')).toBe('Jan-Mar');
    expect(getMonthRangeByLabel('2023 Q1')).toBe('Jan-Mar');
  });

  it('should return "Apr-June" when label includes "Q2"', () => {
    expect(getMonthRangeByLabel('Q2')).toBe('Apr-June');
    expect(getMonthRangeByLabel('2023 Q2')).toBe('Apr-June');
  });

  it('should return "July-Sept" when label includes "Q3"', () => {
    expect(getMonthRangeByLabel('Q3')).toBe('July-Sept');
    expect(getMonthRangeByLabel('2023 Q3')).toBe('July-Sept');
  });

  it('should return "Oct-Dec" when label includes "Q4"', () => {
    expect(getMonthRangeByLabel('Q4')).toBe('Oct-Dec');
    expect(getMonthRangeByLabel('2023 Q4')).toBe('Oct-Dec');
  });

  it('should return "error" when label does not include any quarter', () => {
    expect(getMonthRangeByLabel('2023')).toBe('error');
    expect(getMonthRangeByLabel('')).toBe('error');
    expect(getMonthRangeByLabel('Q5')).toBe('error');
  });
});
