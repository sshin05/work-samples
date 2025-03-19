import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { SortingState } from '@tanstack/react-table';
import { ServerSideTable } from '@/components_new/table/ServerSideTable';
import { useKsatTabColumns } from './useKsatTabColumns';
import { Add } from '@carbon/icons-react';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { useModal } from '@cerberus/react';
import { EnterKsatModal } from './components/EnterKsatModal';
import { useFindKsats } from '@/api/dcwf/ksat/useFindKsats';
import { vstack } from '@cerberus/styled-system/patterns';
import { FiltersModal } from '../Filters/FiltersModal/FiltersModal';
import { type Domain } from '../Filters/FiltersModal/DomainDropdownSearch';
import {
  type KsatSortBy,
  SortDirection,
  type KsatType
} from '@/api/codegen/graphql';
import { FiltersToolbar } from '../Filters/FiltersToolbar/FiltersToolbar';

const PAGE_SIZE = 25;

export const KsatTab = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [selectedKsatTypes, setSelectedKsatTypes] = useState<KsatType[]>([]);
  const [selectedDomains, setSelectedDomains] = useState<Domain[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  // todo: what to do with ksatsError?
  const { ksats, ksatsTotal, ksatsLoading } = useFindKsats({
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
    sortBy: sorting[0]?.id as KsatSortBy
  });

  const enterKsatModal = useModal();
  const filterModal = useModal();

  const onViewClick = useMemo(
    () => (id: string) => {
      router.push(getRouteUrl(routeGenerators.DcwfKsat({ ksatId: id })));
    },
    [router]
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

  const columns = useKsatTabColumns(onViewClick);

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
          data={ksats}
          loading={ksatsLoading}
          page={page}
          setPage={setPage}
          sorting={sorting}
          setSorting={setSorting}
          searchTerm={searchText}
          setSearchTerm={setSearchText}
          searchPlaceholder="Search"
          total={ksatsTotal}
          size={PAGE_SIZE}
          filterProps={{
            setOpenFilters: filterModal.show
          }}
          buttonProps={{
            buttonContent: 'Enter KSAT',
            buttonIcon: <Add />,
            onButtonClick: enterKsatModal.show
          }}
        />
      </div>

      <EnterKsatModal modal={enterKsatModal} />
      <FiltersModal
        type="ksat"
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
