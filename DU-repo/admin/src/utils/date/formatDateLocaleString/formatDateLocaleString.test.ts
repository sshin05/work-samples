import { formatDateLocaleString } from './formatDateLocaleString';

describe('formatDateLocaleString', () => {
  it('returns formatted date string for valid date', () => {
    const date = '2023-01-01T12:00:00Z';

    const toLocaleDateStringMock = jest
      .spyOn(Date.prototype, 'toLocaleDateString')
      .mockReturnValue('01/01/2023');

    const result = formatDateLocaleString(date);

    expect(result).toEqual('01/01/2023');

    toLocaleDateStringMock.mockRestore();
  });

  it('returns undefined for invalid date', () => {
    const invalidDate = 'invalid-date-string';

    const result = formatDateLocaleString(invalidDate);

    expect(result).toBeUndefined();
  });
});
