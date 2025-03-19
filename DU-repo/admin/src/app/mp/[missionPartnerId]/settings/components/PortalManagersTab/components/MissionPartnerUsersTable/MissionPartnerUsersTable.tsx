import { useState, useMemo, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { linkStyles } from './missionPartnerUsersTable.styles';
import { useConfirmModal, useNotificationCenter } from '@cerberus/react';
import { Add, TrashCan } from '@cerberus/icons';
import { LocalTable } from '@/components_new/table/LocalTable';
import { NoDataMessage } from '@/components_new/table/components/NoDataMessage';
import { useFindRolesByMissionPartnerId, useDeleteRoles } from '@/api/role';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';
import { routeGenerators, getRouteUrl } from '@/utils/getRouteUrl';
import { createCheckboxColumnFiltered } from '@/components_new/table/customColumns/createCheckboxColumnFiltered';
import type { FindRolesByMissionPartnerIdQuery } from '@/api/codegen/graphql';
import type { SessionUser } from '@/hooks/useGetSession/useGetSession';

interface MissionPartnerUsersTableProps {
  users: FindRolesByMissionPartnerIdQuery['findRolesByMissionPartnerId'];
  missionPartner: {
    id: string;
  };
  loading: boolean;
  myUser: SessionUser;
  showNewPortalManagerModal: () => void;
}

const roleDictionary = {
  PORTAL_MANAGER: 'Portal Manager',
  PORTAL_VIEWER: 'Portal Viewer'
};

export const MissionPartnerUsersTable = ({
  users,
  missionPartner,
  loading,
  myUser,
  showNewPortalManagerModal
}: MissionPartnerUsersTableProps) => {
  const router = useRouter();
  const { notify } = useNotificationCenter();
  const { deleteRoles } = useDeleteRoles();
  const { roleUserInfoData, refetchRoleUserInfo } =
    useFindRolesByMissionPartnerId(missionPartner?.id);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [toolbarType, setToolbarType] = useState('search');
  const [checkedListLength, setCheckedListLength] = useState(0);
  const checkedListRef = useRef([]);

  const tableUsers = users?.map(user => {
    return { ...user, id: user.userId };
  });

  const routeToLearner = useCallback(
    (info: { row: { original: { userId: string } } }) => {
      const { userId } = info.row.original;
      router.push(
        getRouteUrl(
          routeGenerators.MissionPartnerPortalManager({
            missionPartnerId: missionPartner?.id,
            userId
          })
        )
      );
    },
    [missionPartner?.id, router]
  );

  const onCancelButtonClick = () => {
    checkedListRef.current = [];
    setCheckedListLength(0);
    setToolbarType('search');
    setShowCheckboxes(false);
  };

  const isChanged = useCallback(row => {
    const checkedList = checkedListRef.current;
    if (checkedList.includes(row)) {
      checkedList.splice(checkedList.indexOf(row), 1);
    } else {
      checkedList.push(row);
    }

    setCheckedListLength(checkedList.length);
  }, []);

  const baseMembersColumns = useMemo(
    () => [
      {
        accessorKey: 'userName',
        header: 'Name',
        cell: info => {
          return (
            <div
              className={linkStyles}
              onClick={() => routeToLearner(info)}
            >{`${info.getValue()}`}</div>
          );
        }
      },
      {
        accessorKey: 'userEmail',
        header: 'Email address',
        cell: info => {
          return (
            <div
              className={linkStyles}
              onClick={() => routeToLearner(info)}
            >{`${info.getValue()}`}</div>
          );
        },
        hideOverflow: true
      },
      {
        accessorKey: 'name',
        header: 'Role',
        enableSorting: false,
        cell: info => roleDictionary[info.getValue()]
      },
      {
        accessorKey: 'userDate',
        header: 'Date',
        cell: info => {
          const value = info.getValue();
          if (!value) return 'Onboarding Not Completed';
          return abbreviatedDayDate(value);
        }
      }
    ],
    [routeToLearner]
  );

  const columns = useMemo(() => {
    const newColumns = [...baseMembersColumns];
    if (showCheckboxes)
      newColumns.unshift(
        createCheckboxColumnFiltered({
          isChanged,
          mainUser: myUser.id,
          checkedItems: checkedListRef.current
        })
      );

    return newColumns;
  }, [baseMembersColumns, isChanged, myUser, showCheckboxes]);

  const handleRemoveMembers = useCallback(
    async (userIds, missionPartnerId, name) => {
      await deleteRoles(userIds, missionPartnerId, name)
        .then(() => {
          notify({
            palette: 'success',
            heading: 'Success',
            description: `${userIds.length} Portal Manager${userIds.length > 1 ? 's' : ''} ${
              userIds.length > 1 ? 'were' : 'was'
            } successfully removed from mission partner.`
          });
          refetchRoleUserInfo(missionPartner.id);
        })
        .catch(() => {
          notify({
            palette: 'danger',
            heading: 'Error',
            description: 'Error trying to remove portal manager'
          });
        });
    },
    [deleteRoles, missionPartner.id, notify, refetchRoleUserInfo]
  );

  const confirm = useConfirmModal();
  const handleConfirm = useCallback(
    async selectedManagers => {
      const consent = await confirm.show({
        heading: 'Are you sure?',
        description: `Remove ${selectedManagers.length} Portal Manager${selectedManagers.length > 1 ? 's' : ''}?`,
        actionText: 'Yes, remove',
        cancelText: `No, keep Portal Manager${selectedManagers.length > 1 ? 's' : ''}`
      });
      if (consent) {
        await handleRemoveMembers(
          selectedManagers,
          missionPartner?.id,
          'PORTAL_MANAGER'
        );
        onCancelButtonClick();
      }
    },
    [confirm, handleRemoveMembers, missionPartner?.id]
  );

  return (
    <>
      <LocalTable
        data={tableUsers}
        columns={columns}
        loading={loading}
        noDataMessage={
          <NoDataMessage
            message="Once a user is added as a Portal Manager, they will appear here."
            cta={showNewPortalManagerModal}
            buttonText="Add Portal Manager"
          />
        }
        searchPlaceholder="Search by name, email or role"
        toolbarType={toolbarType}
        buttonProps={{
          buttonIcon: <Add />,
          buttonContent: 'New portal manager',
          onButtonClick: showNewPortalManagerModal
        }}
        editProps={{
          disableEdit: roleUserInfoData.length === 0,
          showEdit: showCheckboxes,
          setShowEdit: setShowCheckboxes
        }}
        isPortalProps
        amountItemsSelected={checkedListLength}
        removeProps={{
          disabled: false,
          buttonText: 'Remove',
          buttonIcon: <TrashCan />,
          onButtonClick: () => {
            handleConfirm(checkedListRef.current);
          }
        }}
        cancelProps={{
          buttonText: 'Cancel',
          onButtonClick: () => onCancelButtonClick()
        }}
      />
    </>
  );
};
