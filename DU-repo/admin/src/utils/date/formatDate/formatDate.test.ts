import moment from 'moment';
import momenttz from 'moment-timezone';
import { formatDate } from './formatDate';

jest.mock('moment', () => jest.fn(() => ({ format: jest.fn() })));
jest.mock('moment-timezone', () => ({
  tz: { guess: jest.fn(), zone: jest.fn() }
}));

describe('formatDate', () => {
  it('returns correct date string', () => {
    const date = new Date('2023-01-01T12:00:00Z');
    (momenttz.tz.guess as jest.Mock).mockReturnValue('America/New_York');
    (momenttz.tz.zone as jest.Mock).mockReturnValue({
      abbr: jest.fn(() => 'EST')
    });

    (moment as unknown as jest.Mock).mockReturnValue({
      format: jest.fn(() => '01 Jan 2023 12:00PM')
    });

    const formattedDate = formatDate(date);

    expect(formattedDate).toEqual('01 Jan 2023 12:00PM EST');
  });
});
