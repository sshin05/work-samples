import { formatAsDate } from './formatAsDate';

describe('formatAsDate', () => {
  beforeAll(() => {
    const mockTimezoneOffset = 120;
    jest
      .spyOn(Date.prototype, 'getTimezoneOffset')
      .mockReturnValue(mockTimezoneOffset);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('returns a valid Date object for a properly formatted input', () => {
    const input = '2023-11-22';
    const result = formatAsDate(input);

    expect(result).toBe('2023-11-22T02:00:00.000Z');
  });

  it('returns an empty string for an invalid date input', () => {
    const invalidInput = 'invalid-date';
    const result = formatAsDate(invalidInput);

    expect(result).toBe('');
  });

  it('handles edge case of an empty string input and return an empty string', () => {
    const input = '';
    const result = formatAsDate(input);

    expect(result).toBe('');
  });

  it('returns an empty string if the input is null', () => {
    const input = null as unknown as string;
    const result = formatAsDate(input);

    expect(result).toBe('');
  });

  it('returns an empty string if the input is undefined', () => {
    const input = undefined as unknown as string;
    const result = formatAsDate(input);

    expect(result).toBe('');
  });
});
