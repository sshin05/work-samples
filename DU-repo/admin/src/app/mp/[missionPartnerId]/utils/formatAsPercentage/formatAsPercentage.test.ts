import { formatAsPercentage } from './formatAsPercentage';

describe('formatAsPercentage', () => {
  it('should format a positive fraction as a percentage', () => {
    const fraction = 0.25;
    expect(formatAsPercentage(fraction)).toBe('25%');
  });

  it('should format zero as 0%', () => {
    const fraction = 0;
    expect(formatAsPercentage(fraction)).toBe('0%');
  });

  it('should format a negative fraction as a percentage', () => {
    const fraction = -0.25;
    expect(formatAsPercentage(fraction)).toBe('-25%');
  });

  it('should format a fraction with more than two decimal places correctly', () => {
    const fraction = 0.12345;
    expect(formatAsPercentage(fraction)).toBe('12%');
  });
});
