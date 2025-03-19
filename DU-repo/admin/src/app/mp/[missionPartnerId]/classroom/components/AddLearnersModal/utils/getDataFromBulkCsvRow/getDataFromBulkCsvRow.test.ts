import { getDataFromBulkCsvRow } from './getDataFromBulkCsvRow';

const MOCK_VALID_ROW = {
  email: 'user@omnifederal.com',
  'first name': 'First Name Value',
  'last name': 'Last Name Value'
};

const EXPECTED_RETURN_FOR_VALID_MOCK = {
  email: MOCK_VALID_ROW.email,
  firstName: MOCK_VALID_ROW['first name'],
  lastName: MOCK_VALID_ROW['last name']
};

describe('getDataFromBulkCsvRow', () => {
  it('should return MemberData when all fields are present and valid', () => {
    const actual = getDataFromBulkCsvRow(MOCK_VALID_ROW);

    expect(actual).toEqual(EXPECTED_RETURN_FOR_VALID_MOCK);
  });

  it('should return null and log a warning when email is missing', () => {
    console.warn = jest.fn();

    const row = {
      ...MOCK_VALID_ROW,
      email: undefined
    };

    expect(getDataFromBulkCsvRow(row)).toBeNull();

    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining('Missing email')
    );
  });

  it('trims leading and trailing spaces in input values', () => {
    const row = {
      email: `     ${MOCK_VALID_ROW.email}       `,
      'first name': `     ${MOCK_VALID_ROW['first name']}       `,
      'last name': `     ${MOCK_VALID_ROW['last name']}       `
    };

    const actual = getDataFromBulkCsvRow(row);

    expect(actual).toEqual(EXPECTED_RETURN_FOR_VALID_MOCK);
  });

  it('should return MemberData with empty first or last name if they are not present', () => {
    const row = {
      ...MOCK_VALID_ROW,
      'first name': undefined,
      'last name': undefined
    };

    expect(getDataFromBulkCsvRow(row)).toEqual({
      email: MOCK_VALID_ROW.email,
      firstName: '',
      lastName: ''
    });
  });
});
