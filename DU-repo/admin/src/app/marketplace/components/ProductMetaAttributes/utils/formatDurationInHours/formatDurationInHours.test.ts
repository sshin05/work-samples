import { formatDurationInHours } from './formatDurationInHours';
import {
  HOURS_PER_DAY,
  HOURS_PER_WEEK
} from './formatDurationInHours.constants';

describe('formatDurationInHours', () => {
  it('returns the duration in hours if less than 24', () => {
    expect(formatDurationInHours(23)).toBe('23 Hours');
  });

  it('returns the duration in days if greater than 24 and less than a week', () => {
    expect(formatDurationInHours(36)).toBe('2 Days');
  });

  it('returns the duration in weeks', () => {
    const weekAndAHalf = HOURS_PER_WEEK + HOURS_PER_WEEK / 2;
    expect(formatDurationInHours(weekAndAHalf)).toBe('2 Weeks');
  });

  describe('pluralization', () => {
    it.each([
      {
        durationInHours: 1,
        expected: '1 Hour'
      },
      {
        durationInHours: 5,
        expected: '5 Hours'
      },
      {
        durationInHours: HOURS_PER_DAY,
        expected: '1 Day'
      },
      {
        durationInHours: HOURS_PER_DAY * 2,
        expected: '2 Days'
      },
      {
        durationInHours: HOURS_PER_WEEK,
        expected: '1 Week'
      },
      {
        durationInHours: HOURS_PER_WEEK * 2,
        expected: '2 Weeks'
      }
    ])(
      'displays the unit with the correct pluralization',
      ({ durationInHours, expected }) => {
        expect(formatDurationInHours(durationInHours)).toBe(expected);
      }
    );
  });
});
