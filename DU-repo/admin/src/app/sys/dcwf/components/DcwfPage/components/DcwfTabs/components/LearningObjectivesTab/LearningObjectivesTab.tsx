import { useMemo, useState } from 'react';
import type { SortingState } from '@tanstack/react-table';
import { useLearningObjectivesTabColumns } from './useLearningObjectivesTabColumns';
import { ServerSideTable } from '@/components_new/table/ServerSideTable';
import { Add } from '@cerberus/icons';
import { useModal } from '@cerberus/react';
import { CreateLearningObjectiveModal } from './components/CreateLearningObjectiveModal';
import { useFindLearningObjectives } from '@/api/dcwf/learning-objective/useFindLearningObjectives';
import {
  type LearningObjectiveSortBy,
  SortDirection,
  type Domain,
  type KsatType
} from '@/api/codegen/graphql';
import { FiltersToolbar } from '../Filters/FiltersToolbar/FiltersToolbar';
import { FiltersModal } from '../Filters/FiltersModal/FiltersModal';
import { vstack } from '@cerberus/styled-system/patterns';

const PAGE_SIZE = 25;

export const LearningObjectivesTab = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [selectedKsatTypes, setSelectedKsatTypes] = useState<KsatType[]>([]);
  const [selectedDomains, setSelectedDomains] = useState<Domain[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const createLearningObjectiveModal = useModal();
  const filterModal = useModal();

  const {
    learningObjectives,
    learningObjectivesTotal,
    learningObjectivesLoading
  } = useFindLearningObjectives({
    filter: {
      search: searchText?.length > 2 ? searchText : undefined,
      ksatTypes: selectedKsatTypes.length > 0 ? selectedKsatTypes : undefined,
      domainIds:
        selectedDomains.length > 0
          ? selectedDomains.map(domain => domain.id)
          : undefined
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

  const handleFilterSubmit = (data: {
    ksatTypes: KsatType[];
    domains: Domain[];
  }) => {
    setSelectedKsatTypes(data.ksatTypes);
    setSelectedDomains(data.domains);
    filterModal.close();
  };

  const handleClearAllFilters = () => {
    setSelectedKsatTypes([]);
    setSelectedDomains([]);
  };

  const handleKsatTypeClick = (ksatType: KsatType) => {
    setSelectedKsatTypes(prev => prev.filter(t => t !== ksatType));
  };

  const handleDomainClick = (domain: Domain) => {
    setSelectedDomains(prev => prev.filter(d => d.id !== domain.id));
  };

  const onViewClick = useMemo(
    () => (id: string) => {
      console.log(`View Learning Objective clicked: ${id}`);
    },
    []
  );

  const columns = useLearningObjectivesTabColumns({ onViewClick });

  return (
    <>
      <div className={vstack({ gap: '2' })}>
        <FiltersToolbar
          selectedKsatTypes={selectedKsatTypes}
          selectedDomains={selectedDomains}
          onKsatTypeClick={handleKsatTypeClick}
          onDomainClick={handleDomainClick}
          onClearAllFilters={handleClearAllFilters}
        />

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
          filterProps={{
            setOpenFilters: filterModal.show
          }}
          buttonProps={{
            buttonContent: 'Create Learning Objective',
            buttonIcon: <Add />,
            onButtonClick: createLearningObjectiveModal.show
          }}
        />
      </div>

      <CreateLearningObjectiveModal
        createLearningObjectiveModal={createLearningObjectiveModal}
      />
      <FiltersModal
        type="learningObjective"
        filtersModal={filterModal}
        filters={{
          ksatTypes: selectedKsatTypes,
          domains: selectedDomains
        }}
        onApplyFilters={handleFilterSubmit}
        resetFilters={handleClearAllFilters}
      />
    </>
  );
};
