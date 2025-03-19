import { useMemo, useState } from 'react';
import type { SortingState } from '@tanstack/react-table';
import { ServerSideTable } from '@/components_new/table/ServerSideTable';
import { useRoleTabColumns } from './useRoleTabColumns';
import { Add } from '@cerberus/icons';
import { useModal } from '@cerberus/react';
import { EnterRoleModal } from './components/EnterRoleModal';
import { useFindJobRoles } from '@/api/dcwf/role/useFindJobRoles';
import {
  type JobRoleSortBy,
  SortDirection,
  type Domain,
  type KsatType
} from '@/api/codegen/graphql';
import { FiltersModal } from '../Filters/FiltersModal/FiltersModal';
import { FiltersToolbar } from '../Filters/FiltersToolbar/FiltersToolbar';
import { vstack } from '@cerberus/styled-system/patterns';

const PAGE_SIZE = 25;

export const RoleTab = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [selectedKsatTypes, setSelectedKsatTypes] = useState<KsatType[]>([]);
  const [selectedDomains, setSelectedDomains] = useState<Domain[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const enterRoleModal = useModal();
  const filterModal = useModal();

  const { jobRoles, jobRolesTotal, jobRolesLoading } = useFindJobRoles({
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
    sortBy: sorting[0]?.id as JobRoleSortBy
  });

  const onViewClick = useMemo(
    () => (_id: string) => {
      // console.log(`View Role clicked: ${id}`);
    },
    []
  );

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

  const columns = useRoleTabColumns({ onViewClick });

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
          data={jobRoles}
          loading={jobRolesLoading}
          page={page}
          setPage={setPage}
          sorting={sorting}
          setSorting={setSorting}
          searchTerm={searchText}
          setSearchTerm={setSearchText}
          searchPlaceholder="Search"
          total={jobRolesTotal}
          size={PAGE_SIZE}
          filterProps={{
            setOpenFilters: filterModal.show
          }}
          buttonProps={{
            buttonContent: 'Enter Role',
            buttonIcon: <Add />,
            onButtonClick: enterRoleModal.show
          }}
        />
      </div>

      <EnterRoleModal enterRoleModal={enterRoleModal} />
      <FiltersModal
        type="jobRole"
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
