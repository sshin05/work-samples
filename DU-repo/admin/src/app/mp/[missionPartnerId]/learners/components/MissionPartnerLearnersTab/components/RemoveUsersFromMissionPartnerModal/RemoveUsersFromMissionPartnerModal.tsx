import { useState } from 'react';
import { Button, Flex, Text } from '@digital-u/digital-ui';
import { AddMultipleUsers } from '@/components_new/modals/ImportUsersModal/components/AddMultipleUsers';
import { CustomModal } from '@/components_new/modals/CustomModal';

export const RemoveUsersFromMissionPartnerModal = ({
  removeBulkUsersModal,
  onClose,
  onUpload
}) => {
  const [activeView, setActiveView] = useState(0);

  return (
    <CustomModal
      customModal={removeBulkUsersModal}
      onClose={onClose}
      title="Remove multiple learners"
    >
      {activeView === 0 && (
        <Flex
          gap="1rem"
          direction="column"
          justifyContent="space-around"
          style={{ margin: '1rem auto' }}
        >
          <Text>
            Use a .csv template to remove up to{' '}
            <span>
              <b>500 learners</b>
            </span>{' '}
            at a time.
          </Text>
          <img
            src="/admin/images/user-spreadsheet.svg"
            alt="user spreadsheet"
          />
          <Flex gap="0.25rem">
            <Button
              kind="pill-primary"
              onClick={() => {
                setActiveView(1);
              }}
            >
              Continue
            </Button>
            <Button kind="pill-secondary" onClick={onClose}>
              Cancel
            </Button>
          </Flex>
        </Flex>
      )}

      {activeView === 1 && (
        /* Hijacking this modal until global modals are ready */
        <AddMultipleUsers
          onAddMultipleUsers={onUpload}
          setShowTabs={() => {
            setActiveView(0);
          }}
          handleOnClose={onClose}
          itemType="learners"
          action="remove"
        />
      )}
    </CustomModal>
  );
};
