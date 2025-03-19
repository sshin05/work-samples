import { useState } from 'react';
import { useAssignLicenseByMissionPartnerAndVendorAndUser } from '@/api/license';
import { useAddLicenseToUsers } from '@/api/user';
import { ImportUsersModal } from '@/components_new/modals/ImportUsersModal';
import { StandardModalHeader } from '@/components_new/modals/StandardModalHeader';

const USER_NOT_FOUND_TEXT = 'No user found. An account will be created.';

export const AddLicensesToUsers = ({
  missionPartner,
  vendorId,
  onClose,
  notify,
  refetchLicenses
}) => {
  const [error, setError] = useState(null);

  const {
    assignLicenseByMissionPartnerAndVendorAndUser,
    assignLicenseByMissionPartnerAndVendorAndUserLoading
  } = useAssignLicenseByMissionPartnerAndVendorAndUser();

  const { addLicenseToUsers, addLicenseToUsersLoading } =
    useAddLicenseToUsers();

  const handleAddSingleUser = async singleUserData => {
    const { email, firstName, lastName } = singleUserData;

    return assignLicenseByMissionPartnerAndVendorAndUser(
      missionPartner.id,
      vendorId,
      {
        email,
        firstName,
        lastName
      }
    )
      .then(() => {
        refetchLicenses();
        notify({
          palette: 'success',
          heading: 'User Added Successfully',
          description: `User uploaded, you will receive an email when your import is complete`
        });

        setError(null);
        onClose();
      })
      .catch(requestError => setError(requestError.message));
  };

  const handleAddMultipleUsers = async multipleUsersData => {
    try {
      const result = await addLicenseToUsers(
        multipleUsersData,
        missionPartner.id,
        vendorId
      );

      if (result?.data?.addLicenseToUsers?.error) {
        setError(result?.data?.addLicenseToUsers?.error);
        notify({
          palette: 'danger',
          heading: 'Error',
          description: result?.data?.addLicenseToUsers?.error
        });
        return;
      }

      notify({
        palette: 'success',
        heading: 'Users Added Successfully',
        description: `File uploaded, you will receive an email when your import is complete`
      });

      setError(null);

      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <StandardModalHeader title="Add License to User" onClose={onClose} />
      <ImportUsersModal
        onClose={onClose}
        onAddSingleUser={handleAddSingleUser}
        onAddMultipleUsers={handleAddMultipleUsers}
        error={error}
        userNotFoundText={USER_NOT_FOUND_TEXT}
        loading={
          assignLicenseByMissionPartnerAndVendorAndUserLoading ||
          addLicenseToUsersLoading
        }
      />
    </>
  );
};
