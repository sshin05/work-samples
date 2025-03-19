import { formatCohortDate } from './formatCohortDate';

describe('formatCohortDate', () => {
  it('formats a single-digit day', () => {
    const inputDate = new Date('2025-01-01T00:00:00Z');
    const expectedOutput = '1 JAN 2025';
    expect(formatCohortDate(inputDate)).toBe(expectedOutput);
  });

  it('formats a two-digit day', () => {
    const inputDate = new Date('2025-01-30T00:00:00Z');
    const expectedOutput = '30 JAN 2025';
    expect(formatCohortDate(inputDate)).toBe(expectedOutput);
  });

  it('returns an empty string when the date is invalid', () => {
    const inputDate = null;
    const expectedOutput = '';
    expect(formatCohortDate(inputDate as unknown as Date)).toBe(expectedOutput);
  });
});
