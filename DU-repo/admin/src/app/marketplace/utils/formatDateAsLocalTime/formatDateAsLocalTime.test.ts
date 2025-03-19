import { formatDateAsLocalTime } from './formatDateAsLocalTime';

describe('formatDateAsLocalTime', () => {
  it('outputs a time value', () => {
    expect(formatDateAsLocalTime('2024-11-21T22:46:00.000Z')).toBe('15:46');
  });
});
