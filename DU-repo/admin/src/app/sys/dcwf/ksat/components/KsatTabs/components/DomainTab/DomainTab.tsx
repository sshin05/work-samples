import { useMemo, useState } from 'react';
import type { SortingState } from '@tanstack/react-table';
import { ServerSideTable } from '@/components_new/table/ServerSideTable';
import { useModal, useNotificationCenter } from '@cerberus/react';
import { Add } from '@carbon/icons-react';
import { useFindDomains } from '@/api/dcwf/domain/useFindDomains';
import { type DomainSortBy, SortDirection } from '@/api/codegen/graphql';
import { useDomainTabColumns } from '@/app/sys/dcwf/components/DcwfPage/components/DcwfTabs/components/DomainTab/useDomainTabColumns';
import { CreateDomainModal } from '@/app/sys/dcwf/components/DcwfPage/components/DcwfTabs/components/DomainTab/components/CreateDomainModal';

const PAGE_SIZE = 25;

interface DomainTabProps {
  ksatId: string;
}

export const DomainTab = ({ ksatId }: DomainTabProps) => {
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState<SortingState>([]);
  const { notify } = useNotificationCenter();

  const { domains, domainsTotal, domainsLoading } = useFindDomains({
    filter: {
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
    sortBy: sorting[0]?.id as DomainSortBy
  });

  const createDomainModal = useModal();

  const onDelete = useMemo(
    () => (_id: string) => {
      notify({
        palette: 'info',
        heading: 'Not Yet Implemented',
        description: 'Delete functionality coming soon'
      });
    },
    [notify]
  );

  const columns = useDomainTabColumns({ onDelete });

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
        total={domainsTotal}
        size={PAGE_SIZE}
        buttonProps={{
          buttonContent: 'Associate Domain',
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
          buttonContent: 'Create Domain',
          buttonIcon: <Add />,
          onButtonClick: () => {
            notify({
              palette: 'info',
              heading: 'Does not yet auto-associate',
              description:
                'Domain will auto-associate with this KSAT in the future'
            });
            createDomainModal.show();
          }
        }}
      />
      <CreateDomainModal createDomainModal={createDomainModal} />
    </>
  );
};
