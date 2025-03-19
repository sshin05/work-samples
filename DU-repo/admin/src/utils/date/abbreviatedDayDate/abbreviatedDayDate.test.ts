import dayjs from 'dayjs';
import { abbreviatedDayDate } from './abbreviatedDayDate';

jest.mock('dayjs', () => jest.fn());

describe('abbreviatedDayDate', () => {
  it('returns correct date string', () => {
    const date = new Date('2023-01-01T12:00:00Z');

    (dayjs as unknown as jest.Mock).mockReturnValue({
      format: jest.fn(() => '01 Jan 2023')
    });

    const formattedDate = abbreviatedDayDate(date);

    expect(formattedDate).toEqual('01 Jan 2023');
  });
});
