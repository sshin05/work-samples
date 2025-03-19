import { camelToCapitalCase } from './camelToCapitalCase';

describe('camelToCapitalCase', () => {
  it('should return an empty string when no string is passed', () => {
    expect(camelToCapitalCase()).toBe('');
  });

  it('should return an empty string when an empty string is passed', () => {
    expect(camelToCapitalCase('')).toBe('');
  });

  it('should return the string with the first letter capitalized', () => {
    expect(camelToCapitalCase('hello')).toBe('Hello');
  });

  it('should return the string with the first letter capitalized and spaces between words', () => {
    expect(camelToCapitalCase('helloWorld')).toBe('Hello World');
  });

  it('should return the string with the first letter capitalized and spaces between words', () => {
    expect(camelToCapitalCase('helloWorld')).toBe('Hello World');
  });
});
