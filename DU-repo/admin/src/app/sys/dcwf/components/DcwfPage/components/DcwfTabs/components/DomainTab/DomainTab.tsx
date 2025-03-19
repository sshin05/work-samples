import { useMemo, useState } from 'react';
import { useDomainTabColumns } from './useDomainTabColumns';
import type { SortingState } from '@tanstack/react-table';
import { ServerSideTable } from '@/components_new/table/ServerSideTable';
import { useModal } from '@cerberus/react';
import { Add } from '@cerberus/icons';
import { CreateDomainModal } from './components/CreateDomainModal';
import { useFindDomains } from '@/api/dcwf/domain/useFindDomains';
import { type DomainSortBy, SortDirection } from '@/api/codegen/graphql';

const PAGE_SIZE = 25;

export const DomainTab = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const { domains, domainsTotal, domainsLoading } = useFindDomains({
    filter: {
      search: searchText?.length > 2 ? searchText : undefined
    },
    pageSize: PAGE_SIZE,
    pageNumber: page,
    sortDirection:
      sorting[0]?.desc !== undefined
        ? sorting[0]?.desc
          ? SortDirection.Desc
          : SortDirection.Asc
        : undefined,
    sortBy: sorting[0]?.id as DomainSortBy
  });

  const createDomainModal = useModal();

  const onViewClick = useMemo(
    () => (_id: string) => {
      console.log(`View Domain clicked: ${_id}`);
    },
    []
  );

  const columns = useDomainTabColumns({ onViewClick });

  return (
    <>
      <ServerSideTable
        columns={columns}
        data={domains}
        loading={domainsLoading}
        page={page}
        setPage={setPage}
        sorting={sorting}
        setSorting={setSorting}
        searchTerm={searchText}
        setSearchTerm={setSearchText}
        searchPlaceholder="Search"
        total={domainsTotal}
        size={PAGE_SIZE}
        buttonProps={{
          buttonContent: 'Create Domain',
          buttonIcon: <Add />,
          onButtonClick: createDomainModal.show
        }}
      />
      <CreateDomainModal createDomainModal={createDomainModal} />
    </>
  );
};
