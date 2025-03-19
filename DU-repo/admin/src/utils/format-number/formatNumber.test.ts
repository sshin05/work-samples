import { formatNumber } from './formatNumber';

describe('camelToCapitalCase', () => {
  it('should return an number with commas', () => {
    expect(formatNumber(1000000)).toBe('1,000,000');
  });
});
