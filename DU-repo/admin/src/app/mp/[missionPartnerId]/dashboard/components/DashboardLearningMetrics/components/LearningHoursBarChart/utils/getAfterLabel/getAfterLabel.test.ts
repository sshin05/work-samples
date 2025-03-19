import { getAfterLabel } from './getAfterLabel';

describe('getAfterLabel', () => {
  const reverseDataPercentage = [0.004, 0.1, 0.5, 1];
  const reverseLearnersPerCategory = [5, 10, 15, 20];
  const dataTotal = 50;

  it('should return "<1%" for 0% parsedPercentage and learners > 0', () => {
    const result = getAfterLabel(
      0,
      reverseDataPercentage,
      reverseLearnersPerCategory,
      dataTotal
    );
    expect(result).toBe('of completed training (<1%)');
  });

  it('should return ">99%" for 100% parsedPercentage and learners not equal to dataTotal', () => {
    const result = getAfterLabel(
      3,
      reverseDataPercentage,
      reverseLearnersPerCategory,
      dataTotal
    );
    expect(result).toBe('of completed training (>99%)');
  });

  it('should return correct percentage for other cases', () => {
    const result = getAfterLabel(
      1,
      reverseDataPercentage,
      reverseLearnersPerCategory,
      dataTotal
    );
    expect(result).toBe('of completed training (10%)');
  });
});
