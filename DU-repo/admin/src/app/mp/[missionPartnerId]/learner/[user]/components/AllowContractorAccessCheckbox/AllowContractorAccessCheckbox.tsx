/**
 * This AllowContractorAccess component is a bit atypical in that it directly calls a mutation, which seemed to clean up code a bunch.
 * Thus, this component does a few things:
 *
 *   1) displays user.allowContractorAccess
 *   2) manages the toggleAllowContractorAccess mutation on change
 *   3) calls notify on success/failure
 *
 * Backend Note: Backend toggleAllowContractorAccess currently does not return error on failure when user is not contractor (not a biggie, since we don't render without that value),
 * but I believe toggleAllowContractorAccess returns the final/correct value of user.canAccessFullDu (following backend contractor validations, etc.);
 * None the less, I do check `((newCheckboxState && responseValue === newCheckboxState) || (!newCheckboxState && responseValue === null))`
 * to verify that the backend and frontend are in sync, and only show the success message if the above if block is true (and all is in-sync).
 *
 */
import { useEffect, useState } from 'react';
import { useToggleAllowContractorAccess } from '@/api/user';
import { Tooltip, useNotificationCenter } from '@cerberus/react';
import { Checkbox } from '@/components_new/form/Checkbox/Checkbox';

const CONTRACTOR_CHECKBOX_LABEL = 'Contractor access to all of DU';
const CONTRACTOR_CHECKBOX_TOOLTIP =
  'Please contact your DU Customer Success Manager to have Contractor Access enabled for a Learner.';

interface AllowContractorAccessCheckboxProps {
  userId: string;
  hasContractorAccess: boolean;
  isDuAdmin: boolean;
}

export const AllowContractorAccessCheckbox = ({
  userId,
  hasContractorAccess,
  isDuAdmin
}: AllowContractorAccessCheckboxProps) => {
  const { notify } = useNotificationCenter();
  const [allowContractorAccess, setAllowContractorAccess] =
    useState(hasContractorAccess);
  const { toggleAllowContractorAccess, toggleAllowContractorAccessLoading } =
    useToggleAllowContractorAccess();
  const isActive = toggleAllowContractorAccessLoading || !isDuAdmin;

  const handleCheckboxChange = async () => {
    const newCheckboxState = !allowContractorAccess;
    setAllowContractorAccess(newCheckboxState);
    try {
      const response = await toggleAllowContractorAccess(
        userId,
        newCheckboxState
      );
      const responseValue =
        response?.data?.toggleAllowContractorAccess?.canAccessFullDu;

      if (
        (newCheckboxState && responseValue === newCheckboxState) ||
        (!newCheckboxState && responseValue === null)
      ) {
        notify({
          palette: 'success',
          heading: 'Success',
          description: 'Contractor access updated successfully'
        });
      }
    } catch (_error) {
      setAllowContractorAccess(!newCheckboxState);
      notify({
        palette: 'danger',
        heading: 'Error',
        description: 'Failed to update contractor access'
      });
    }
  };

  useEffect(() => {
    setAllowContractorAccess(hasContractorAccess);
  }, [hasContractorAccess]);

  const renderCheckboxWithWrapper = (
    isActive: boolean,
    content: string,
    children: React.ReactNode
  ) => {
    return isActive ? (
      <Tooltip position="top" content={content}>
        {children}
      </Tooltip>
    ) : (
      <>{children}</>
    );
  };

  return renderCheckboxWithWrapper(
    isActive,
    CONTRACTOR_CHECKBOX_TOOLTIP,
    <Checkbox
      onChange={handleCheckboxChange}
      describedBy="contractor-account"
      value={allowContractorAccess}
      name="contractor-account"
      labelText={CONTRACTOR_CHECKBOX_LABEL}
      labelSize="md"
      disabled={isActive}
    />
  );
};
