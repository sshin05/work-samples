import { useState, useMemo, useRef, useCallback } from 'react';
import { Add, TrashCan } from '@cerberus/icons';
import { LocalTable } from '@/components_new/table/LocalTable';
import { createCheckboxColumn } from '@/components_new/table/customColumns/createCheckboxColumn';
import { NoDataMessage } from '@/components_new/table/components/NoDataMessage';
import { RemoveCohortMemberModal } from '../RemoveCohortMemberModal';
import { useModal } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';

const baseMembersColumns = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
    cell: info => (
      <span
        className={css({
          display: 'block',
          minW: '8.125rem'
        })}
      >
        {info.getValue()}
      </span>
    )
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
    cell: info => (
      <span
        className={css({
          display: 'block',
          minW: '8.125rem'
        })}
      >
        {info.getValue()}
      </span>
    )
  },
  {
    header: 'Email Address',
    accessorKey: 'email'
  }
];

interface Member {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface MembersTabProps {
  addMember: () => void;
  isLoading?: boolean;
  pageLoading?: boolean;
  members?: Member[];
  groupId: string;
  handleRemoveMembers: (groupId: string, groupMembers: string[]) => void;
}

export const MembersTab = ({
  members,
  isLoading,
  pageLoading,
  addMember,
  groupId,
  handleRemoveMembers
}: MembersTabProps) => {
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});
  const [toolbarType, setToolbarType] = useState('search');
  const [checkedListLength, setCheckedListLength] = useState(0);
  const checkedListRef = useRef([]);
  const removeCohortMemberModal = useModal();

  const onCancelButtonClick = () => {
    setSelectedRows({});
    checkedListRef.current = [];
    setCheckedListLength(0);
    setToolbarType('search');
    setShowCheckboxes(false);
  };

  const onRemoveButtonClick = (groupId, groupMembers) => {
    handleRemoveMembers(groupId, groupMembers);
    onCancelButtonClick();
  };

  const isChanged = useCallback(
    userId => {
      setSelectedRows(prevSelectedRows => {
        const newSelectedRows = { ...prevSelectedRows };

        if (newSelectedRows[userId]) {
          delete newSelectedRows[userId];
        } else {
          newSelectedRows[userId] = true;
        }

        const selectedKeys = Object.keys(newSelectedRows);
        checkedListRef.current = selectedKeys;
        setCheckedListLength(selectedKeys.length);

        return newSelectedRows;
      });
    },
    [setSelectedRows, checkedListRef, setCheckedListLength]
  );

  const columns = useMemo(() => {
    const newColumns = [...baseMembersColumns];
    if (showCheckboxes)
      newColumns.unshift(createCheckboxColumn({ isChanged, selectedRows }));
    return newColumns;
  }, [showCheckboxes, isChanged, selectedRows]);

  return (
    <>
      <LocalTable
        columns={columns}
        data={members}
        loading={isLoading}
        pageLoading={pageLoading}
        noDataMessage={
          <NoDataMessage
            cta={addMember}
            buttonText="Add Member"
            message="When you add members to a cohort, they will appear here."
          />
        }
        hasToolbar
        searchPlaceholder="Search by first name, last name or email address"
        toolbarType={toolbarType}
        buttonProps={{
          onButtonClick: () => addMember(),
          buttonContent: 'Learner',
          buttonIcon: <Add />
        }}
        editProps={{
          disableEdit: members?.length === 0,
          showEdit: showCheckboxes,
          setShowEdit: setShowCheckboxes
        }}
        amountItemsSelected={checkedListLength}
        removeProps={{
          disabled: false,
          buttonIcon: <TrashCan color="red" />,
          buttonText: 'Remove',
          onButtonClick: removeCohortMemberModal.show
        }}
        cancelProps={{
          buttonText: 'Cancel',
          onButtonClick: () => onCancelButtonClick()
        }}
      />
      <RemoveCohortMemberModal
        onSubmit={onRemoveButtonClick}
        groupMembers={Object.keys(selectedRows)}
        groupId={groupId}
        removeCohortMemberModal={removeCohortMemberModal}
      />
    </>
  );
};
