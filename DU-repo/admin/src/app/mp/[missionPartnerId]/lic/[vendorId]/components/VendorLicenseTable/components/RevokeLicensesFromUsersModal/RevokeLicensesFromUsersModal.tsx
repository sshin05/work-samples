import { useState } from 'react';
import { Button, Flex, Text } from '@digital-u/digital-ui';
import { AddMultipleUsers } from '@/components_new/modals/ImportUsersModal/components/AddMultipleUsers';
import { CustomModal } from '@/components_new/modals/CustomModal';

export const RevokeLicensesFromUsersModal = ({
  revokeLicensesFromUsersModal,
  onClose,
  onUpload
}) => {
  const [step, setStep] = useState<'stepOne' | 'stepTwo'>('stepOne');

  return (
    <CustomModal
      customModal={revokeLicensesFromUsersModal}
      title="Remove multiple licenses"
      onClose={onClose}
    >
      {step === 'stepOne' && (
        <Flex
          gap="1rem"
          direction="column"
          justifyContent="space-around"
          style={{ margin: '1rem auto' }}
        >
          <Text>
            Use a .csv template to remove up to{' '}
            <span>
              <b>500 licenses</b>
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
                setStep('stepTwo');
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

      {step === 'stepTwo' && (
        <AddMultipleUsers
          onAddMultipleUsers={onUpload}
          setShowTabs={() => {
            setStep('stepOne');
          }}
          handleOnClose={onClose}
          itemType="licenses"
          action="remove"
        />
      )}
    </CustomModal>
  );
};
