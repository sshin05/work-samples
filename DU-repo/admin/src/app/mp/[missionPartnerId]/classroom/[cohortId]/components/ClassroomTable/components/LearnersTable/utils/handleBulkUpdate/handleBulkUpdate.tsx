import { readString } from 'react-papaparse';

/**
 * ParseError mimics papaparse's error type.
 */
export type ParseError = {
  type: string;
  code: string;
  message: string;
  row?: number;
};

export type MemberData = {
  email: string;
  firstName: string;
  lastName: string;
};

const getDataFromRow = (row: Record<string, string>): MemberData | null => {
  const email = row.email.trim();
  const firstName = row['first name'].trim();
  const lastName = row['last name'].trim();

  if (!email) {
    console.warn(`Missing or invalid email in row: ${JSON.stringify(row)}`);
    return null;
  }

  return {
    email,
    firstName,
    lastName
  };
};

export const handleBulkUpdate = (
  onError: (e: ParseError) => void,
  addMembersToCohort: (data: MemberData[]) => Promise<void>
): void => {
  const inputElement = document.createElement('input');
  inputElement.type = 'file';
  inputElement.accept = '.csv';

  inputElement.onchange = async event => {
    const file = (event.target as HTMLInputElement)?.files?.[0];

    if (!file) {
      console.warn('No file selected.');
      return;
    }

    const fileContent = await file.text();

    readString(fileContent, {
      header: true,
      skipEmptyLines: true,
      transformHeader: header => header.toLowerCase(),
      complete: async results => {
        const { data, errors } = results;

        if (errors.length > 0) {
          console.error('Errors in CSV file:', errors);
          const error: ParseError = errors[0];
          onError(error);
          return;
        }

        try {
          const memberDataList = data.map(getDataFromRow);

          if (!memberDataList.length) {
            console.warn('No valid data found in the CSV.');
            return;
          }

          await addMembersToCohort(memberDataList);
        } catch (error) {
          console.error('Error during bulk update:', error);
          onError({
            type: 'BulkUpdateError',
            code: 'BULK_UPDATE_FAILED',
            message: 'One or more rows failed to process.'
          });
        }
      }
    });
  };

  inputElement.click();
};
