import { formatNumberWithSuffix } from './formatNumberWithSuffix';

describe('formatNumberWithSuffix', () => {
  it('should return the number as a string if less than 1000', () => {
    expect(formatNumberWithSuffix(999)).toBe('999');
  });

  it('should append "k" for numbers between 1000 and 999999', () => {
    expect(formatNumberWithSuffix(1000)).toBe('1k');
    expect(formatNumberWithSuffix(12345)).toBe('12.345k');
    expect(formatNumberWithSuffix(999999)).toBe('999.99k');
  });

  it('should append "M" for numbers 1000000 and above', () => {
    expect(formatNumberWithSuffix(1000000)).toBe('1M');
    expect(formatNumberWithSuffix(1234567)).toBe('1.2345M');
    expect(formatNumberWithSuffix(9999999)).toBe('9.9999M');
  });

  it('should handle different totalDigits values', () => {
    expect(formatNumberWithSuffix(12345, 4)).toBe('12.34k');
    expect(formatNumberWithSuffix(12345, 5)).toBe('12.345k');
    expect(formatNumberWithSuffix(1234567, 2)).toBe('1.2M');
  });
});
