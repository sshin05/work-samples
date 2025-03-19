import { createTicks } from './createTicks';

describe('createTicks', () => {
  it('should return formatted string with % of plans for the last index', () => {
    expect(createTicks(50, 5, 50, 'Plans')).toBe('50% of plans');
  });

  it('should return undefined for the first index', () => {
    expect(createTicks(50, 0, 5, 'Plans')).toBeUndefined();
  });

  it('should return formatted string with % for even indexes', () => {
    expect(createTicks(50, 2, 5, 'Plans')).toBe('50%');
    expect(createTicks(75, 4, 5, 'Plans')).toBe('75%');
  });

  it('should return undefined for odd indexes except the first and last', () => {
    expect(createTicks(50, 1, 5, 'Plans')).toBeUndefined();
    expect(createTicks(75, 3, 5, 'Plans')).toBeUndefined();
  });
});
