import { calculateMaxHeight } from './calculateMaxHeight';

describe('calculateMaxHeight', () => {
  it('returns correct value for responsive wrapper', () => {
    const result = calculateMaxHeight(500, true, 'wrapper');
    expect(result).toBe('calc(100vh - 300px)');
  });

  it('returns correct value for responsive container', () => {
    const result = calculateMaxHeight(500, true, 'container');
    expect(result).toBe('calc(100vh - 300px - 50px)');
  });

  it('returns correct value for non-responsive wrapper', () => {
    const result = calculateMaxHeight(500, false, 'wrapper');
    expect(result).toBe('575px');
  });

  it('returns correct value for non-responsive container', () => {
    const result = calculateMaxHeight(500, false, 'container');
    expect(result).toBe('500px');
  });
});
