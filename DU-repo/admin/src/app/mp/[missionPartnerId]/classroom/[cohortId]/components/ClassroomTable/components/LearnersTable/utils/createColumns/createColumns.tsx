import type { CohortMemberData } from '@/app/mp/[missionPartnerId]/classroom/[cohortId]/cohort.types';
import type { Row } from '@tanstack/react-table';
import { LearnerRowMenu } from '../../components/LearnerRowMenu/LearnerRowMenu';

type CreateColumnsParams = {
  cohortId: string;
  isDuAdmin: boolean;
  onRemoveSuccess: () => void;
  onRemoveError: () => void;
};

export const createColumns = ({
  cohortId,
  isDuAdmin,
  onRemoveSuccess,
  onRemoveError
}: CreateColumnsParams) => {
  return [
    {
      header: 'First Name',
      accessorKey: 'firstName',
      cell: info => info.getValue() || 'N/A',
      enableSorting: true
    },
    {
      header: 'Last Name',
      accessorKey: 'lastName',
      cell: info => info.getValue() || 'N/A',
      enableSorting: true
    },
    {
      header: 'Email',
      accessorKey: 'email',
      cell: info => info.getValue() || 'N/A',
      enableSorting: true
    },
    {
      header: 'Grade',
      accessorKey: 'grade',
      cell: info => info.getValue() || '--',
      enableSorting: true
    },
    {
      header: 'Certificate',
      accessorKey: 'certificate',
      cell: info => info.getValue() || '--',
      enableSorting: true
    },
    ...(isDuAdmin
      ? [
          {
            header: '',
            accessorKey: 'actions',
            cell: ({ row }: { row: Row<CohortMemberData> }) => {
              const rowData = row.original;
              return (
                <LearnerRowMenu
                  rowData={rowData}
                  cohortId={cohortId}
                  onRemoveSuccess={onRemoveSuccess}
                  onRemoveError={onRemoveError}
                />
              );
            },
            enableSorting: false
          }
        ]
      : [])
  ];
};
