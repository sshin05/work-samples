'use client';
import { Button, useNotificationCenter } from '@cerberus/react';
import { useState, useEffect } from 'react';
import { type CohortMemberData } from '../../../../cohort.types';
import { useGetSession } from '@/hooks/useGetSession';
import { hstack } from '@cerberus/styled-system/patterns';
import { Csv, SearchLocate } from '@cerberus/icons';
import { LocalTable } from '@/components_new/table/LocalTable';
import { css } from '@cerberus/styled-system/css';
import { jsonToCSV } from 'react-papaparse';
import { createColumns } from './utils/createColumns/createColumns';
import {
  handleBulkUpdate,
  type MemberData,
  type ParseError
} from './utils/handleBulkUpdate/handleBulkUpdate';
import {
  sqlAddCohortMember,
  sqlFindCohortMembers,
  sqlGetCohort
} from '@/app/api/cohorts';
import { useSQLMutation, useSQLQuery } from '@/app/api';
import { sqlCreateUser, sqlFindUsers } from '@/app/api/users';
import { useRouteParams } from '@/hooks/useRouteParams';
import { AddLearnerModal } from '@/app/mp/[missionPartnerId]/classroom/components/AddLearnerModal/AddLearnerModal';

const getPluralizedText = (count: number, singular: string, plural: string) => {
  if (count === 1) {
    return singular;
  }

  return plural;
};

const downloadFile = (content: string, fileName: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const generateAndDownloadCSV = (data: CohortMemberData[]): void => {
  if (!data?.length) {
    console.warn('No data provided for CSV generation.');
    return;
  }

  const headers = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'grade', label: 'Grade' }
  ];

  const csvData = data.map(row => {
    const formattedRow: Record<string, string> = {};
    headers.forEach(header => {
      formattedRow[header.label] = row[header.key] || '';
    });
    return formattedRow;
  });

  const csv = jsonToCSV(csvData, { header: true });
  downloadFile(csv, 'cohort_members.csv', 'text/csv;charset=utf-8;');
};

type Props = {
  cohortId: string;
};

const limit = 20;

export function LearnersTable({ cohortId }: Props) {
  const { missionPartnerId } = useRouteParams();
  const { isDuAdmin } = useGetSession();
  const [cohortMembers, setCohortMembers] = useState<CohortMemberData[]>([]);
  const [isAddingMembers, setIsAddingMembers] = useState(false);
  const { notify } = useNotificationCenter();
  const [showAddLearnerModal, setShowAddLearnerModal] =
    useState<boolean>(false);

  const { query: fetchUser } = useSQLQuery(sqlFindUsers);

  const { mutation: addCohortMember } = useSQLMutation(sqlAddCohortMember);

  const { mutation: importSingleUser, loading: importSingleUserLoading } =
    useSQLMutation(sqlCreateUser);

  const addMembersToCohort = async (members: MemberData[]) => {
    setIsAddingMembers(true);
    try {
      const newUserPromises = members.map(async member => {
        const result = await fetchUser({ filter: { search: member.email } });
        const hasUser = result?.data?.records?.length > 0;

        if (!hasUser) {
          const userCreationData = {
            email: member.email,
            firstName: member.firstName,
            lastName: member.lastName,
            missionPartnerId
          };
          await importSingleUser(userCreationData);
        }
      });

      await Promise.all(newUserPromises);

      const addMemberPromises = members.map(async member => {
        const result = await fetchUser({ filter: { search: member.email } });
        const user = result?.data?.records?.[0];

        if (user) {
          const isAlreadyInCohort = cohortMembers.some(
            cohortMember => cohortMember.id === user.id
          );

          if (!isAlreadyInCohort) {
            await addCohortMember({
              userId: user.id,
              cohortId
            });
          }
        }
      });

      await Promise.all(addMemberPromises);
      onBulkUpdateSuccess();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      notify({
        palette: 'danger',
        heading: 'Error',
        description: 'Failed to add one or more learners to the cohort.'
      });
    } finally {
      setIsAddingMembers(false);
    }
  };

  const [options] = useState<any>({
    filter: { cohortId },
    pageSize: limit
  });

  const {
    data: cohortMembersData,
    loading: cohortMembersLoading,
    query: fetchCohortMembers
  } = useSQLQuery(sqlFindCohortMembers, {
    options
  });

  const {
    data: cohort,
    loading: cohortLoading,
    query: _fetchCohort
  } = useSQLQuery(sqlGetCohort, { options: { id: cohortId } });

  useEffect(() => {
    if (!cohortMembersLoading && cohortMembersData && cohort) {
      const { key: sortKey, direction: sortDirection } = options.sort || {};
      const sortedMembers = [...cohortMembersData].sort((a, b) => {
        const aValue = a[sortKey] || '';
        const bValue = b[sortKey] || '';
        if (sortDirection === 'asc') {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        }
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      });
      setCohortMembers(sortedMembers.filter(member => member.id));
    }
  }, [cohortMembersLoading, cohortMembersData, options.sort, cohort]);

  const refetchCohortMembers = async () => {
    const response = await fetchCohortMembers({ cohortId: cohortId });
    if (response?.data) {
      setCohortMembers(response.data.filter(member => member.id));
    } else {
      console.error('Failed to fetch updated cohort members');
    }
  };

  const { learnersMax } = cohort || {};
  const verifiedMembers = cohortMembers.filter(member => member.id);
  const numLearnersText =
    cohortMembers.length > 0
      ? `${verifiedMembers.length} ${getPluralizedText(
          verifiedMembers.length,
          'learner',
          'learners'
        )}`
      : '0 learners';

  const remainingSeats =
    typeof learnersMax === 'number'
      ? Math.max(0, learnersMax - (cohortMembersData?.length || 0))
      : null;

  const seatsRemainingText =
    remainingSeats !== null
      ? `| ${remainingSeats} ${getPluralizedText(
          remainingSeats,
          'seat',
          'seats'
        )} remaining`
      : '';

  const onRemoveSuccess = async () => {
    notify({
      palette: 'success',
      heading: 'Success',
      description: 'Member removed successfully.'
    });

    try {
      const response = await fetchCohortMembers({ cohortId });
      if (response?.data) {
        setCohortMembers(response.data.filter(member => member.id));
      } else {
        console.error('Failed to fetch updated cohort members');
      }
    } catch (e) {
      console.error('Failed to fetch cohort:', e);
    }
  };

  const onRemoveError = () => {
    notify({
      palette: 'danger',
      heading: 'Error',
      description: 'There was an error removing the member.'
    });
  };

  const localTableColumns = createColumns({
    cohortId,
    isDuAdmin,
    onRemoveSuccess,
    onRemoveError
  });

  const onBulkUpdateSuccess = async () => {
    try {
      const response = await fetchCohortMembers({ cohortId });
      if (response?.data) {
        setCohortMembers(response.data.filter(member => member.id));
      } else {
        console.error('Failed to fetch updated cohort members');
      }
    } catch (e) {
      console.error('Failed to fetch cohort:', e);
    }

    notify({
      palette: 'success',
      heading: 'Bulk Update',
      description: 'Members were added successfully.'
    });
  };

  const onBulkUpdateError = (error: ParseError) => {
    notify({
      palette: 'danger',
      heading: 'Bulk Update',
      description: (
        <>
          <span>{error.message}</span>
          {error.row ? (
            <>
              <br />
              <span>Please verify row {error.row}.</span>
            </>
          ) : null}
        </>
      )
    });
  };

  return (
    <div>
      <div className={hstack({ justifyContent: 'space-between', mb: '6' })}>
        <span className={css({ whiteSpace: 'nowrap' })}>
          {numLearnersText} {seatsRemainingText}
        </span>
        <div className={hstack({ gap: '4' })}>
          <Button
            shape="rounded"
            onClick={() =>
              handleBulkUpdate(onBulkUpdateError, addMembersToCohort)
            }
          >
            Bulk Update <Csv size={16} />
          </Button>
          <Button
            shape="rounded"
            usage="outlined"
            onClick={() => setShowAddLearnerModal(true)}
          >
            Add an Individual <SearchLocate size={16} />
          </Button>
        </div>
      </div>
      <LocalTable
        columns={localTableColumns}
        // Only show members that have completed sign-up
        /// @TODO(Lyle): This may be unnecessary; verify after
        // complete SQL flow is added for users.
        // NB: In case a user is deleted from the `user` table,
        // a nullified user may still appear in the cohort members list.
        data={cohortMembers.filter(member => member.id)}
        defaultSorting={[{ id: 'firstName', desc: false }]}
        searchPlaceholder="Search"
        loading={
          !cohort || cohortLoading || importSingleUserLoading || isAddingMembers
        }
        skeletonRows={10}
        pageSize={limit}
        downloadProps={
          cohortMembers
            ? {
                onDownload: () => generateAndDownloadCSV(cohortMembers)
              }
            : null
        }
      />
      {showAddLearnerModal && (
        <AddLearnerModal
          cohortId={cohort.id}
          displayModal={showAddLearnerModal}
          onClose={() => setShowAddLearnerModal(false)}
          onSuccess={() => {
            notify({
              palette: 'success',
              heading: 'Add Member',
              description: 'Member was added successfully.'
            });
            refetchCohortMembers();
          }}
          onError={() => {
            notify({
              palette: 'danger',
              heading: 'Error',
              description: 'There was an error adding the member.'
            });
          }}
        />
      )}
    </div>
  );
}
