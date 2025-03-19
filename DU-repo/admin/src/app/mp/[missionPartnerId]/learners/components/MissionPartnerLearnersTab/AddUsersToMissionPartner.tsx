import { useState } from 'react';
import { useImportBulkUsers, useImportSingleUser } from '@/api/user';
import { ImportUsersModal } from '@/components_new/modals/ImportUsersModal';
import { StandardModalHeader } from '@/components_new/modals/StandardModalHeader';

const USER_NOT_FOUND_TEXT = 'No user found. An account will be created.';

export interface AddUsersToMissionPartnerProps {
  missionPartnerId: string;
  notify: ({}) => void;
  onClose: () => void;
  onUsersAdded: () => void;
}

export const AddUsersToMissionPartner = ({
  missionPartnerId,
  notify,
  onClose,
  onUsersAdded
}: AddUsersToMissionPartnerProps) => {
  const [error, setError] = useState(null);

  const { importBulkUsers, importBulkUsersLoading } = useImportBulkUsers();
  const { importSingleUser, importSingleUserLoading } = useImportSingleUser();
  const importLoading = importBulkUsersLoading || importSingleUserLoading;

  const onComplete = () => {
    onUsersAdded();
    setError(null);
    onClose();
  };

  const handleAddSinglerUser = async singleUserData => {
    const { email, firstName, lastName } = singleUserData;
    try {
      const singleUserImportResult = await importSingleUser({
        variables: {
          firstName,
          lastName,
          email,
          missionPartnerId
        }
      });

      if (singleUserImportResult?.data?.importSingleUser?.error) {
        setError(singleUserImportResult?.data?.importSingleUser?.error);
        return;
      }

      onComplete();
      notify({
        palette: 'success',
        heading: 'Success',
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
      const result = await importBulkUsers({
        variables: {
          bulkUploadFile: multipleUsersData,
          missionPartnerId
        }
      });

      if (result?.data?.importBulkUsers?.error) {
        setError(result?.data?.importBulkUsers?.error);
        notify({
          palette: 'danger',
          heading: 'Error',
          description: result?.data?.importBulkUsers?.error
        });

        return;
      }

      notify({
        palette: 'success',
        heading: 'Users Import Initiated',
        description: `File uploaded, you will receive an email when your import is complete`
      });
    } catch (error) {
      setError(error.message);
      notify({
        palette: 'danger',
        heading: 'Error',
        description: 'There was an error importing users.'
      });
    }
  };

  return (
    <>
      <StandardModalHeader title="Learners" onClose={onClose} />
      <ImportUsersModal
        onClose={onClose}
        title="Learners"
        onAddSingleUser={handleAddSinglerUser}
        onAddMultipleUsers={handleAddMultipleUsers}
        error={error}
        userNotFoundText={USER_NOT_FOUND_TEXT}
        loading={importLoading}
      />
    </>
  );
};
