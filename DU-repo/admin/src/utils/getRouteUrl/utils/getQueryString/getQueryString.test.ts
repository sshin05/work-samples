import { getQueryString } from './';

describe('getQueryString', () => {
  it('should handle and empty query', () => {
    expect(getQueryString({})).toBe('');
  });

  it('should return a query string if the query is not empty', () => {
    const query = {
      param1: 'value1',
      param2: 'value2'
    };
    expect(getQueryString(query)).toBe('?param1=value1&param2=value2');
  });

  it('handles array values', () => {
    const query = {
      stringParam: 'string',
      arrayParam: ['value_0', 'value_1', 'value_2']
    };

    expect(getQueryString(query)).toBe(
      '?stringParam=string&arrayParam=value_0&arrayParam=value_1&arrayParam=value_2'
    );
  });
});
