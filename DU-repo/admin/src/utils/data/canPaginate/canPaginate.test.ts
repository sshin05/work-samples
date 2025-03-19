import { canPaginate } from './canPaginate';

describe('canPaginate', () => {
  it('returns true when there are more records to display', () => {
    expect(canPaginate(1, 20, 45)).toBe(true);
  });

  it('returns false when no more records remain', () => {
    expect(canPaginate(3, 20, 60)).toBe(false);
  });

  it('returns false for invalid pageNumber', () => {
    expect(canPaginate(0, 20, 45)).toBe(false);
    expect(canPaginate(-1, 20, 45)).toBe(false);
    // @ts-expect-error - random test
    expect(canPaginate('a', 20, 45)).toBe(false);
  });

  it('returns false for invalid pageSize', () => {
    expect(canPaginate(1, 0, 45)).toBe(false);
    expect(canPaginate(1, -5, 45)).toBe(false);
    // @ts-expect-error - random test
    expect(canPaginate(1, 'a', 45)).toBe(false);
  });

  it('returns false for invalid totalCount', () => {
    expect(canPaginate(1, 20, -1)).toBe(false);
    // @ts-expect-error - random test
    expect(canPaginate(1, 20, 'a')).toBe(false);
  });
});
