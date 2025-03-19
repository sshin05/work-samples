import { formatForDateInputDisplay } from './formatForDateInputDisplay';

describe('formatForDateInputDisplay', () => {
  it('returns an empty string if the input is undefined', () => {
    expect(formatForDateInputDisplay(undefined as unknown as Date)).toBe('');
  });

  it('returns an empty string if the input is null', () => {
    expect(formatForDateInputDisplay(null as unknown as Date)).toBe('');
  });

  it('formats a valid date object to YYYY-MM-DD', () => {
    const inputDate = new Date('2025-11-22T15:30:00Z');
    const formattedDate = formatForDateInputDisplay(inputDate);

    expect(formattedDate).toBe('2025-11-22');
  });

  it('correctly handles a Date object with only the date part', () => {
    const inputDate = new Date('2025-11-22');
    const formattedDate = formatForDateInputDisplay(inputDate);

    expect(formattedDate).toBe('2025-11-22');
  });

  it('correctly handles time zones by always converting to UTC', () => {
    const inputDate = new Date('2025-11-22T00:00:00-05:00'); // UTC-5
    const formattedDate = formatForDateInputDisplay(inputDate);

    expect(formattedDate).toBe('2025-11-22');
  });
});
