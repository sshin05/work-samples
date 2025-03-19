import { useForm } from 'react-hook-form';
import { UserSearchInput } from './components/UserSearchInput';
import type { User } from './components/UserSearchInput/UserSearchInput.types';
import { ModalFormButtons } from '../ModalFormButtons/ModalFormButtons';
import { useState } from 'react';
import { useSQLMutation } from '@/app/api';
import { sqlAddCohortMember } from '@/app/api/cohorts';
import type { CohortMemberData } from '../../../../[cohortId]/cohort.types';

export type AddExistingUserFormProps = {
  cohortId: string;
  userInputSearchValue: string | null;
  onAddExistingUserFormInputChange: (searchValue: string) => void;
  onSelectExistingUser: (user: User | null) => void;
  onCreateNewUserSelected: () => void;
  onClose: () => void;
  onSuccess: (cohortMember: CohortMemberData) => void;
  onError: () => void;
};

export const AddExistingUserForm = ({
  cohortId,
  userInputSearchValue,
  onAddExistingUserFormInputChange,
  onSelectExistingUser,
  onCreateNewUserSelected,
  onClose,
  onSuccess,
  onError
}: AddExistingUserFormProps) => {
  const {
    control: formControl,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { mutation: addCohortMember, loading: addCohortMemberLoading } =
    useSQLMutation(sqlAddCohortMember);

  const handleAddExistingUserToCohort = async () => {
    try {
      if (!selectedUser) {
        return;
      }

      await addCohortMember({
        userId: selectedUser?.id,
        cohortId
      });

      const cohortMember: CohortMemberData = {
        id: selectedUser?.id,
        firstName: selectedUser?.firstName,
        lastName: selectedUser?.lastName,
        email: selectedUser?.email
      };

      onSuccess(cohortMember);
    } catch (error) {
      console.log(`Error: ${error}`);
      onError();
    } finally {
      onClose();
    }
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    onSelectExistingUser(user);
  };

  return (
    <form role="form" onSubmit={handleSubmit(handleAddExistingUserToCohort)}>
      <UserSearchInput
        formControl={formControl}
        onExistingUserSelect={handleUserSelect}
        onCreateNewUser={onCreateNewUserSelected}
        userInputSearchValue={userInputSearchValue}
        onInputChange={onAddExistingUserFormInputChange}
      />

      <ModalFormButtons
        isSubmittingForm={addCohortMemberLoading || isSubmitting}
        onClose={onClose}
      />
    </form>
  );
};
