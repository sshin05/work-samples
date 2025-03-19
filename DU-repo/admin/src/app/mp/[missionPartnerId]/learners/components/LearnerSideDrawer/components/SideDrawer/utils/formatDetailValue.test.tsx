import { formatDetailValue } from './formatDetailValue';

describe('formatDetailValue', () => {
  describe('when label is "Total time training"', () => {
    it('returns "0 hours" when value is null', () => {
      expect(formatDetailValue('Total time training', null)).toBe('0 hours');
    });

    it('returns "0 hours" when value is undefined', () => {
      expect(formatDetailValue('Total time training', undefined)).toBe(
        '0 hours'
      );
    });

    it('returns "0 hours" when value is 0', () => {
      expect(formatDetailValue('Total time training', 0)).toBe('0 hours');
    });

    it('returns "5 hours" when value is 5', () => {
      expect(formatDetailValue('Total time training', 5)).toBe('5 hours');
    });

    it('returns "Test hours" when value is "Test"', () => {
      expect(formatDetailValue('Total time training', 'Test')).toBe(
        'Test hours'
      );
    });
  });

  describe('when label is not "Total time training"', () => {
    it('returns "--" when value is null', () => {
      expect(formatDetailValue('Some Label', null)).toBe('--');
    });

    it('returns "--" when value is undefined', () => {
      expect(formatDetailValue('Some Label', undefined)).toBe('--');
    });

    it('returns "--" when value is 0', () => {
      expect(formatDetailValue('Some Label', 0)).toBe('--');
    });

    it('returns "--" when value is an empty string', () => {
      expect(formatDetailValue('Some Label', '')).toBe('--');
    });

    it('capitalizes the first letter of a lowercase string', () => {
      expect(formatDetailValue('Some Label', 'hello')).toBe('Hello');
    });

    it('leaves the string unchanged if the first letter is already uppercase', () => {
      expect(formatDetailValue('Some Label', 'Hello')).toBe('Hello');
    });

    it('converts a numeric value (non-zero) to a string', () => {
      // Here, numeric 5 becomes "5" because the function converts it to a string.
      expect(formatDetailValue('Some Label', 5)).toBe('5');
    });
  });
});
