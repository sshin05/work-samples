import type { MemberData } from '../../../../[cohortId]/components/ClassroomTable/components/LearnersTable/utils/handleBulkUpdate/handleBulkUpdate';

export const getDataFromBulkCsvRow = (
  row: Record<string, string>
): MemberData | null => {
  const email = row.email?.trim();
  const firstName = row['first name']?.trim() || '';
  const lastName = row['last name']?.trim() || '';

  if (!email) {
    console.warn(`Missing email in row: ${JSON.stringify(row)}`);
    return null;
  }

  return {
    email,
    firstName,
    lastName
  };
};
