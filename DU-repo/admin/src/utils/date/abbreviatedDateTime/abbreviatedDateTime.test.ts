import dayjs from 'dayjs';
import { abbreviatedDateTime } from './abbreviatedDateTime';

jest.mock('dayjs', () => jest.fn());

describe('abbreviatedDayDate', () => {
  it('returns the correct string', () => {
    const date = new Date('2023-01-01T12:00:00Z');
    (dayjs as unknown as jest.Mock).mockReturnValue({
      format: jest.fn(() => '01 Jan 2023 12:00PM')
    });

    const formattedDate = abbreviatedDateTime(date);

    expect(formattedDate).toEqual('01 Jan 2023 12:00PM');
  });
});
