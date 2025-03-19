import { getDataFromBulkCsvRow } from '../getDataFromBulkCsvRow/getDataFromBulkCsvRow';
import { handleParsedCsv } from './parseBulkUploadCsv';

jest.mock('../getDataFromBulkCsvRow/getDataFromBulkCsvRow');

describe('handleParsedCsv', () => {
  const resolveMock = jest.fn();
  const rejectMock = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('resolves with the formatted csv data with valid input', async () => {
    const validUserRow = {
      email: 'mock@omnifederal.com',
      'first name': 'mock-first-name',
      'last name': 'mock-last-name'
    };

    const results = {
      data: [validUserRow],
      errors: []
    };

    const formattedResult = {
      firstName: 'mock-first-name',
      lastName: 'mock-last-name',
      email: 'mock@omnifederal.com'
    };

    (getDataFromBulkCsvRow as jest.Mock).mockReturnValueOnce(formattedResult);

    const csvHandler = handleParsedCsv(resolveMock, rejectMock);
    await csvHandler(results);

    const expected = {
      success: true,
      bulkUploadList: [formattedResult]
    };

    expect(resolveMock).toHaveBeenCalledWith(expected);
  });

  it('rejects when there are errors in the results', async () => {
    const results = {
      data: [],
      errors: [
        {
          type: 'BulkUpdateError',
          message: 'One or more rows failed to process.'
        }
      ]
    };

    const csvHandler = handleParsedCsv(resolveMock, rejectMock);
    await csvHandler(results);

    expect(rejectMock).toHaveBeenCalledWith({
      success: false,
      error: results.errors[0]
    });
  });

  it('rejects when the csv is empty', async () => {
    const results = {
      data: [],
      errors: []
    };

    const csvHandler = handleParsedCsv(resolveMock, rejectMock);
    await csvHandler(results);

    expect(rejectMock).toHaveBeenCalledWith({
      success: false,
      error: {
        message: 'No valid data found in the CSV.'
      }
    });
  });

  it('rejects when the results are not processed as expected', async () => {
    const results = {
      data: [{ invalidData: 'true' }],
      errors: []
    };

    (getDataFromBulkCsvRow as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Processing error');
    });

    const csvHandler = handleParsedCsv(resolveMock, rejectMock);
    await csvHandler(results);

    expect(rejectMock).toHaveBeenCalledWith({
      success: false,
      error: {
        type: 'BulkUpdateError',
        message: 'One or more rows failed to process.'
      }
    });
  });
});
