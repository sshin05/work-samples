import { useMemo, useState } from 'react';
import type { SortingState } from '@tanstack/react-table';
import { ServerSideTable } from '@/components_new/table/ServerSideTable';
import { Add } from '@cerberus/icons';
import { useModal, useNotificationCenter } from '@cerberus/react';
import { useFindLearningObjectives } from '@/api/dcwf/learning-objective/useFindLearningObjectives';
import {
  type LearningObjectiveSortBy,
  SortDirection
} from '@/api/codegen/graphql';
import { vstack } from '@cerberus/styled-system/patterns';
import { useLearningObjectivesTabColumns } from '@/app/sys/dcwf/components/DcwfPage/components/DcwfTabs/components/LearningObjectivesTab/useLearningObjectivesTabColumns';
import { CreateLearningObjectiveModal } from '@/app/sys/dcwf/components/DcwfPage/components/DcwfTabs/components/LearningObjectivesTab/components/CreateLearningObjectiveModal';

const PAGE_SIZE = 25;

interface LearningObjectivesTabProps {
  ksatId: string;
}

export const LearningObjectivesTab = ({
  ksatId
}: LearningObjectivesTabProps) => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const { notify } = useNotificationCenter();

  const createLearningObjectiveModal = useModal();

  const {
    learningObjectives,
    learningObjectivesTotal,
    learningObjectivesLoading
  } = useFindLearningObjectives({
    filter: {
      search: searchText?.length > 2 ? searchText : undefined,
      ksatId
    },
    pageSize: PAGE_SIZE,
    pageNumber: page,
    sortDirection:
      sorting[0]?.desc !== undefined
        ? sorting[0]?.desc
          ? SortDirection.Desc
          : SortDirection.Asc
        : undefined,
    sortBy: sorting[0]?.id as LearningObjectiveSortBy
  });

  const onDelete = useMemo(
    () => (id: string) => {
      console.log(
        `Delete Learning Objective clicked: ${id} for ksatId: ${ksatId}`
      );
      notify({
        palette: 'info',
        heading: 'Not Yet Implemented',
        description: 'Delete functionality coming soon'
      });
    },
    [ksatId, notify]
  );

  const columns = useLearningObjectivesTabColumns({ onDelete });

  return (
    <>
      <div className={vstack({ gap: '2' })}>
        <ServerSideTable
          columns={columns}
          data={learningObjectives}
          loading={learningObjectivesLoading}
          page={page}
          setPage={setPage}
          sorting={sorting}
          setSorting={setSorting}
          searchTerm={searchText}
          setSearchTerm={setSearchText}
          searchPlaceholder="Search"
          total={learningObjectivesTotal}
          size={PAGE_SIZE}
          buttonProps={{
            buttonContent: 'Associate Learning Objective',
            buttonIcon: <Add />,
            onButtonClick: () => {
              notify({
                palette: 'info',
                heading: 'Not Yet Implemented',
                description: 'Associate functionality coming soon'
              });
            }
          }}
          secondaryButtonProps={{
            buttonContent: 'Create Learning Objective',
            buttonIcon: <Add />,
            onButtonClick: () => {
              notify({
                palette: 'info',
                heading: 'Does not yet auto-associate',
                description:
                  'Learning Objective will auto-associate with this KSAT in the future'
              });
              createLearningObjectiveModal.show();
            }
          }}
        />
      </div>

      <CreateLearningObjectiveModal
        createLearningObjectiveModal={createLearningObjectiveModal}
      />
    </>
  );
};
