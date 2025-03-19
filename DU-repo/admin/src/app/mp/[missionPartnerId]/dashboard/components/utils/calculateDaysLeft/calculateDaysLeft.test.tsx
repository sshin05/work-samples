import { calculateDaysLeft } from './calculateDaysLeft';

describe('calculateDaysLeft', () => {
  it('should return the correct number of days left', () => {
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 10);

    const daysLeft = calculateDaysLeft(endDate.toISOString());
    expect(daysLeft).toBe(10);
  });

  it('should return 0 if the end date is today', () => {
    const today = new Date().toISOString();
    const daysLeft = calculateDaysLeft(today);
    expect(daysLeft).toBe(0);
  });

  it('should return 0 if the end date is in the past', () => {
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(today.getDate() - 5); // 5 days in the past

    const daysLeft = calculateDaysLeft(endDate.toISOString());
    expect(daysLeft).toBe(0);
  });
});
