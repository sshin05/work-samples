import { getLabel } from './getLabel';

describe('getLabel', () => {
  const reverseCategoryHours = [50, 40, 30, 20, 10];
  const reverseLearnersPerCategory = [5, 10, 15, 20, 25, 30, 35];

  it('should return correct label for index 0', () => {
    const result = getLabel(
      0,
      reverseCategoryHours,
      reverseLearnersPerCategory
    );
    expect(result).toBe('5 Learners with 50+ hours');
  });

  it('should return correct label for index 1', () => {
    const result = getLabel(
      1,
      reverseCategoryHours,
      reverseLearnersPerCategory
    );
    expect(result).toBe('10 Learners with 40-50 hours');
  });

  it('should return correct label for index 2', () => {
    const result = getLabel(
      2,
      reverseCategoryHours,
      reverseLearnersPerCategory
    );
    expect(result).toBe('15 Learners with 30-40 hours');
  });

  it('should return correct label for index 3', () => {
    const result = getLabel(
      3,
      reverseCategoryHours,
      reverseLearnersPerCategory
    );
    expect(result).toBe('20 Learners with 20-30 hours');
  });

  it('should return correct label for index 4', () => {
    const result = getLabel(
      4,
      reverseCategoryHours,
      reverseLearnersPerCategory
    );
    expect(result).toBe('25 Learners with 10-20 hours');
  });

  it('should return correct label for index 5', () => {
    const result = getLabel(
      5,
      reverseCategoryHours,
      reverseLearnersPerCategory
    );
    expect(result).toBe('30 Learners with 0-10 hours');
  });

  it('should return correct label for index 6', () => {
    const result = getLabel(
      6,
      reverseCategoryHours,
      reverseLearnersPerCategory
    );
    expect(result).toBe('35 Learners with 0 hours');
  });
});
