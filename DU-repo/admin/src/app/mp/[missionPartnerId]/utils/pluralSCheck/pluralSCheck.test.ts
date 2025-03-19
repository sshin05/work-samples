import { pluralSCheck } from './pluralSCheck';

describe('pluralSCheck', () => {
  it('should return "s" when subject is greater than 1', () => {
    expect(pluralSCheck(2)).toBe('s');
    expect(pluralSCheck(10)).toBe('s');
  });

  it('should return an empty string when subject is equal to 1', () => {
    expect(pluralSCheck(1)).toBe('');
  });

  it('should return an empty string when subject is less than 1', () => {
    expect(pluralSCheck(0)).toBe('');
    expect(pluralSCheck(-1)).toBe('');
  });
});
