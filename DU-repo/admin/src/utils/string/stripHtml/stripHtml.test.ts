import { stripHtml } from './stripHtml';

describe('utils - stripHtml', () => {
  it('should return the string as is if it is an empty string', () => {
    expect(stripHtml('')).toEqual('');
  });
  it('should return the string as is if it does not contain html string', () => {
    expect(stripHtml('Hello Bart!')).toEqual('Hello Bart!');
  });

  it('should return the string without any html tags', () => {
    expect(stripHtml('<h1>Hey <em>Bart</em>!</hi>')).toEqual('Hey Bart!');
  });
});
