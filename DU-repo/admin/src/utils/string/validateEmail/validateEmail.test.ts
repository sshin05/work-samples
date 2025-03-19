import { validateEmail } from './validateEmail';

describe('validateEmail', () => {
  it('should return false when no email is passed', () => {
    expect(validateEmail()).toBe(false);
  });

  it('should return false when an empty string is passed', () => {
    expect(validateEmail('')).toBe(false);
  });

  it('should return false when an invalid email is passed', () => {
    expect(validateEmail('hello')).toBe(false);
  });

  it('should return false when an email without @ is passed', () => {
    expect(validateEmail('hello.com')).toBe(false);
  });

  it('should return false when an email without a domain is passed', () => {
    expect(validateEmail('hello@')).toBe(false);
  });

  it('should return true when a valid email is passed', () => {
    expect(validateEmail('hello@example.com')).toBe(true);
  });
  it('should return true when a valid email including allowable special character is passed', () => {
    expect(validateEmail('hello+test2$@example.com')).toBe(true);
  });
});
