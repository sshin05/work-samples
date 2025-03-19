import { useMemo, useState } from 'react';
import type { SortingState } from '@tanstack/react-table';
import { ServerSideTable } from '@/components_new/table/ServerSideTable';
import { useModal, useNotificationCenter } from '@cerberus/react';
import { useFindJobRoles } from '@/api/dcwf/role/useFindJobRoles';
import { type JobRoleSortBy, SortDirection } from '@/api/codegen/graphql';
import { vstack } from '@cerberus/styled-system/patterns';
import { EnterRoleModal } from '@/app/sys/dcwf/components/DcwfPage/components/DcwfTabs/components/RoleTab/components/EnterRoleModal';
import { Add } from '@carbon/icons-react';
import { useRoleTabColumns } from '@/app/sys/dcwf/components/DcwfPage/components/DcwfTabs/components/RoleTab/useRoleTabColumns';

const PAGE_SIZE = 25;

interface RoleTabProps {
  ksatId: string;
}

export const RoleTab = ({ ksatId }: RoleTabProps) => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const { notify } = useNotificationCenter();

  const enterRoleModal = useModal();

  const { jobRoles, jobRolesTotal, jobRolesLoading } = useFindJobRoles({
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
    sortBy: sorting[0]?.id as JobRoleSortBy
  });

  const onDelete = useMemo(
    () => (id: string) => {
      console.log(`Delete Role clicked: ${id} for ksatId: ${ksatId}`);
      notify({
        palette: 'info',
        heading: 'Not Yet Implemented',
        description: 'Delete functionality coming soon'
      });
    },
    [ksatId, notify]
  );

  const columns = useRoleTabColumns({ onDelete });

  return (
    <>
      <div className={vstack({ gap: '2' })}>
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
          buttonProps={{
            buttonContent: 'Associate Role',
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
            buttonContent: 'Create Role',
            buttonIcon: <Add />,
            onButtonClick: () => {
              notify({
                palette: 'info',
                heading: 'Does not yet auto-associate',
                description:
                  'Role will auto-associate with this KSAT in the future'
              });
              enterRoleModal.show();
            }
          }}
        />
      </div>

      <EnterRoleModal enterRoleModal={enterRoleModal} />
    </>
  );
};
