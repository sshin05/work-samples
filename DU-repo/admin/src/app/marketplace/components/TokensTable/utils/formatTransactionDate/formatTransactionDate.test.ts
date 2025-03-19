import { formatTransactionDate } from './formatTransactionDate';
import { isValidDate } from '@/app/marketplace/utils/isValidDate';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';

jest.mock('@/app/marketplace/utils/isValidDate', () => ({
  isValidDate: jest.fn()
}));

jest.mock('@/utils/date/abbreviatedDayDate', () => ({
  abbreviatedDayDate: jest.fn()
}));

describe('formatTransactionDate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns the formatted date when the date value is valid', () => {
    const mockDate = '2024-12-18';
    const mockFormattedDate = '18 Dec 2024';

    (isValidDate as jest.Mock).mockReturnValue(true);
    (abbreviatedDayDate as jest.Mock).mockReturnValue(mockFormattedDate);

    const result = formatTransactionDate(mockDate);

    expect(isValidDate).toHaveBeenCalledWith(mockDate);
    expect(abbreviatedDayDate).toHaveBeenCalledWith(mockDate);
    expect(result).toBe(mockFormattedDate);
  });

  it('returns an empty string when the date value is invalid', () => {
    const mockDate = 'invalid-date';

    (isValidDate as jest.Mock).mockReturnValue(false);

    const result = formatTransactionDate(mockDate);

    expect(isValidDate).toHaveBeenCalledWith(mockDate);
    expect(abbreviatedDayDate).not.toHaveBeenCalled();
    expect(result).toBe('');
  });

  it('returns an empty string when the date value is empty', () => {
    const mockDate = '';

    const result = formatTransactionDate(mockDate);

    expect(isValidDate).not.toHaveBeenCalled();
    expect(abbreviatedDayDate).not.toHaveBeenCalled();
    expect(result).toBe('');
  });
});
