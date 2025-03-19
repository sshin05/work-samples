import { readString } from 'react-papaparse';
import { getDataFromBulkCsvRow } from '../getDataFromBulkCsvRow/getDataFromBulkCsvRow';
import type { MemberData } from '../../AddLearnersModal.types';

export type ParseError = {
  type: string;
  code?: string;
  message: string;
  row?: number;
};

type ParsedResult = {
  success: boolean;
  bulkUploadList: MemberData[];
  error?: ParseError;
};

export const handleParsedCsv = (
  resolve,
  reject
): ((results: {
  data: Record<string, string>[];
  errors: ParseError[];
}) => Promise<void>) => {
  return async results => {
    const { data, errors } = results;

    if (errors.length > 0) {
      return reject({
        success: false,
        error: errors[0]
      });
    }

    try {
      const memberDataList = data.map(getDataFromBulkCsvRow);

      if (!memberDataList.length) {
        return reject({
          success: false,
          error: {
            message: 'No valid data found in the CSV.'
          }
        });
      }

      return resolve({ success: true, bulkUploadList: memberDataList });
    } catch {
      reject({
        success: false,
        error: {
          type: 'BulkUpdateError',
          message: 'One or more rows failed to process.'
        }
      });
    }
  };
};

export const parseBulkUploadCsv = (
  csvString: string
): Promise<ParsedResult> => {
  return new Promise((resolve, reject) => {
    readString(csvString, {
      header: true,
      skipEmptyLines: true,
      transformHeader: header => header.toLowerCase(),
      complete: handleParsedCsv(resolve, reject)
    });
  });
};
