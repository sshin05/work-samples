import {
  isValidTrialDates,
  formatTrialDates
} from '../../src/components/manage-mission-partners/utils/validateTrialDates';

describe('validateDates', () => {
  it('should return true if the start and end dates are present', () => {
    const startDate = new Date(new Date().setHours(0, 0, 0, 0));
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + 1
    );

    expect(
      isValidTrialDates(
        startDate.toLocaleDateString('en-GB'),
        endDate.toLocaleDateString('en-GB')
      )
    ).toBe(true);
  });

  it('should return false if the end dates are not present', () => {
    expect(isValidTrialDates('1/1/24', undefined)).toBe(false);
  });
});

describe('formatTrialDates', () => {
  it('should return newly formatted dates', () => {
    expect(formatTrialDates('01/01/24', '01/02/24')).toEqual({
      formattedStartDate: new Date(2024, 0, 1),
      formattedEndDate: new Date(2024, 1, 1, 23, 59)
    });
  });
});
