import json2Csv from '@/utils/json-2-csv';

describe('convert json to csv', () => {
  const formatError =
    'No titles found in object. This function expects an object formatted like this:' +
    '{\n' +
    "  'titles' : ['name','age','city'],\n" +
    "  'data' : [\n" +
    "    {'name': 'John', 'age': '25', 'city': 'New York'},\n" +
    "    {'name': 'Jane', 'age': '24', 'city': 'New York'},\n" +
    "    {'name': 'Joe', 'age': '26', 'city': 'New York'}\n" +
    '  ]\n' +
    '}\n' +
    "'titles' is an array of the titles at the top of the resulting csv and 'data' is an array of the rows following the titles.";
  it('should convert json data to csv', () => {
    const json = {
      titles: ['name', 'age', 'city'],
      data: [
        { name: 'John', age: '25', city: 'New York' },
        { name: 'Jane', age: '24', city: 'New York' },
        { name: 'Joe', age: '26', city: 'New York' }
      ]
    };
    const response = json2Csv.convertToCsv(json);
    const expected = `name,age,city\nJohn,25,New York\nJane,24,New York\nJoe,26,New York\n`;
    expect(response).toMatch(expected);
  });

  it('should return error if json data is malformed', () => {
    const mockErrorFunc = jest.fn();
    const invalidJson = null;
    const response = json2Csv.convertToCsv(invalidJson, mockErrorFunc);

    expect(response).toBe(null);
    expect(mockErrorFunc).toBeCalledWith(formatError);
  });
});

describe('convert csv to json', () => {
  const formatError =
    'No lines found in csv. This function expects a string in csv format like this:' +
    '"name,age,city' +
    'John,25,New York' +
    'Jane,24,New York' +
    'Joe,26,New York"';
  it('should convert csv data to json', () => {
    const csv = `name,age,city\nJohn,25,New York\nJane,24,New York\nJoe,26,New York`;
    const response = json2Csv.convertToJson(csv);
    const expected = {
      titles: ['name', 'age', 'city'],
      data: [
        { name: 'John', age: '25', city: 'New York' },
        { name: 'Jane', age: '24', city: 'New York' },
        { name: 'Joe', age: '26', city: 'New York' }
      ]
    };
    expect(response).toEqual(expected);
  });

  it('should return error if csv data is malformed', () => {
    const mockErrorFunc = jest.fn();
    const invalidCsv = null;
    const response = json2Csv.convertToJson(invalidCsv, mockErrorFunc);

    expect(response).toBe(null);
    expect(mockErrorFunc).toBeCalledWith(formatError);
  });
});
