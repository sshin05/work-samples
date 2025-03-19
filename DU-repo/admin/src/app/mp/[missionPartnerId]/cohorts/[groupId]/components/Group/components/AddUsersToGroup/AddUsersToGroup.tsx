import { useState } from 'react';
import { useImportBulkUsers, useImportSingleUser } from '@/api/user';
import { ImportUsersModal } from '@/components_new/modals/ImportUsersModal';
import { useNotificationCenter } from '@cerberus/react';
import { StandardModalHeader } from '@/components_new/modals/StandardModalHeader';

interface AddUsersToGroupProps {
  group: {
    name: string;
    id: string;
  };
  show?: boolean;
  onClose: (groupId?: string) => void;
  type?: string;
}

const USER_NOT_FOUND_TEXT = 'No user found. An account will be created.';

export const AddUsersToGroup = ({
  group,
  onClose,
  type = 'group'
}: AddUsersToGroupProps) => {
  const { notify } = useNotificationCenter();
  const [error, setError] = useState(null);

  const { importBulkUsers, importBulkUsersLoading } = useImportBulkUsers();
  const { importSingleUser, importSingleUserLoading } = useImportSingleUser();
  const importLoading = importBulkUsersLoading || importSingleUserLoading;

  const onComplete = () => {
    onClose();
    setError(null);
  };

  const handleAddSingleUser = async singleUserData => {
    const { email, firstName, lastName } = singleUserData;

    try {
      const singleUserImportResult = await importSingleUser({
        variables: {
          firstName,
          lastName,
          email,
          groupId: group.id
        }
      });

      if (singleUserImportResult?.data?.importSingleUser?.error) {
        setError(singleUserImportResult?.data?.importSingleUser?.error);
        return;
      }

      onComplete();
      notify({
        palette: 'success',
        heading: 'User Added Successfully',
        description: `User uploaded, you will receive an email when your import is complete`
      });
    } catch (error) {
      setError(error.message);
      notify({
        palette: 'danger',
        heading: 'Error',
        description: 'There was an error adding a user.'
      });
    }
  };

  const handleAddMultipleUsers = async multipleUsersData => {
    try {
      const bulkImportResult = await importBulkUsers({
        variables: {
          bulkUploadFile: multipleUsersData,
          groupId: group.id
        }
      });

      if (bulkImportResult?.data?.importBulkUsers?.error) {
        setError(bulkImportResult?.data?.importBulkUsers?.error);
        notify({
          palette: 'danger',
          heading: 'Error',
          description: `Error: ${bulkImportResult?.data?.importBulkUsers?.error}`
        });
        return;
      }

      notify({
        palette: 'success',
        heading: 'Users Added Successfully',
        description: `File uploaded, you will receive an email when your import is complete`
      });
    } catch (error) {
      setError(error.message);
      notify({
        palette: 'danger',
        heading: 'Error',
        description: 'There was an error adding users.'
      });
    }
  };

  const handleOnClose = () => {
    onClose();
  };

  return (
    <>
      <StandardModalHeader
        title={`Add Learners to ${type === 'cohort' ? 'Cohort' : 'Group'}`}
        onClose={handleOnClose}
      />
      <ImportUsersModal
        onClose={onClose}
        title={type === 'cohort' ? 'User to Cohort' : 'User to Group'}
        onAddSingleUser={handleAddSingleUser}
        onAddMultipleUsers={handleAddMultipleUsers}
        error={error}
        userNotFoundText={USER_NOT_FOUND_TEXT}
        loading={importLoading}
      />
    </>
  );
};
