import { createTicks } from './createTicks';

describe('createTicks', () => {
  it('should return "0% of learners" for index 0', () => {
    const result = createTicks(0, 0);
    expect(result).toBe('0% of learners');
  });

  it('should return percentage for even index', () => {
    const result = createTicks(0.5, 2);
    expect(result).toBe('50%');
  });

  it('should return undefined for odd index', () => {
    const result = createTicks(0.5, 1);
    expect(result).toBeUndefined();
  });
});
