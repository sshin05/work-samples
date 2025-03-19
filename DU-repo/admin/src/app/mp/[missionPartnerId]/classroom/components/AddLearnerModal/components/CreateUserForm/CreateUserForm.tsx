import { vstack } from '@cerberus/styled-system/patterns';
import { Controller, useForm } from 'react-hook-form';
import { FormFieldWrapper } from '../../../../[cohortId]/components/FormFieldWrapper';
import { Input } from '@cerberus/react';
import { ModalFormButtons } from '../ModalFormButtons/ModalFormButtons';
import { useSQLMutation } from '@/app/api';
import { sqlAddCohortMember } from '@/app/api/cohorts';
import { sqlCreateUser } from '@/app/api/users';
import { EMAIL_VALIDATION_REGEX } from '../../AddLearnerModal.constants';
import type { CohortMemberData } from '../../../../[cohortId]/cohort.types';

export enum FORM_INPUTS {
  'EMAIL' = 'Email',
  'FIRST_NAME' = 'First Name',
  'LAST_NAME' = 'Last Name'
}

export type CreateUserFormData = {
  [FORM_INPUTS.EMAIL]: string;
  [FORM_INPUTS.FIRST_NAME]: string;
  [FORM_INPUTS.LAST_NAME]: string;
};

export type CreateUserInputs = {
  cohortId: string;
  userInputSearchValue: string | null;
  onClose: () => void;
  onSuccess: (cohortMember: CohortMemberData) => void;
  onError: () => void;
};

export const CreateUserForm = ({
  cohortId,
  userInputSearchValue,
  onClose,
  onSuccess,
  onError
}: CreateUserInputs) => {
  const { control: formControl, handleSubmit } = useForm();
  const { mutation: addCohortMember, loading: addCohortMemberLoading } =
    useSQLMutation(sqlAddCohortMember);
  const { mutation: importSingleUser, loading: importSingleUserLoading } =
    useSQLMutation(sqlCreateUser);

  /** Create a new user, then add the created user to the cohort */
  const handleAddNewUserToCohort = async (formData: CreateUserFormData) => {
    try {
      const submissionData = {
        firstName: formData[FORM_INPUTS.FIRST_NAME],
        lastName: formData[FORM_INPUTS.LAST_NAME],
        email: formData[FORM_INPUTS.EMAIL]
        // missionPartnerId
      };

      const { data: user } = await importSingleUser({
        ...submissionData
      });

      const pendingUserId = user?.id;

      await addCohortMember({
        userId: pendingUserId,
        cohortId
      });

      const cohortMember: CohortMemberData = {
        id: pendingUserId,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email
      };

      onSuccess(cohortMember);
    } catch (error) {
      console.error(`Error: ${error}`);
      onError();
    } finally {
      onClose();
    }
  };

  // Creating a user & adding to cohort requires two requests
  const isSubmittingForm = addCohortMemberLoading || importSingleUserLoading;

  return (
    <form
      role="form"
      onSubmit={handleSubmit(handleAddNewUserToCohort)}
      className={vstack({
        alignItems: 'flex-start',
        w: 'full',
        mt: 4
      })}
    >
      <Controller
        name={FORM_INPUTS.EMAIL}
        control={formControl}
        rules={{
          required: 'Email is required.',
          validate: (email: string) => {
            return EMAIL_VALIDATION_REGEX.test(email || '');
          }
        }}
        defaultValue={userInputSearchValue}
        render={({ field: { ref, ...field }, fieldState }) => {
          return (
            <FormFieldWrapper
              fieldState={fieldState}
              fieldName={FORM_INPUTS.EMAIL}
              isRequired
            >
              <Input
                id={FORM_INPUTS.EMAIL}
                placeholder=""
                type="text"
                {...field}
              />
            </FormFieldWrapper>
          );
        }}
      />

      <Controller
        name={FORM_INPUTS.FIRST_NAME}
        control={formControl}
        rules={{
          required: 'First name is required'
        }}
        render={({ field: { ref, ...field }, fieldState }) => {
          return (
            <FormFieldWrapper
              fieldState={fieldState}
              fieldName={FORM_INPUTS.FIRST_NAME}
              isRequired
            >
              <Input
                id={FORM_INPUTS.FIRST_NAME}
                placeholder=""
                type="text"
                {...field}
              />
            </FormFieldWrapper>
          );
        }}
      />

      <Controller
        name={FORM_INPUTS.LAST_NAME}
        control={formControl}
        rules={{
          required: 'Last name is required'
        }}
        render={({ field: { ref, ...field }, fieldState }) => {
          return (
            <FormFieldWrapper
              fieldState={fieldState}
              fieldName={FORM_INPUTS.LAST_NAME}
              isRequired
            >
              <Input
                id={FORM_INPUTS.LAST_NAME}
                placeholder=""
                type="text"
                {...field}
              />
            </FormFieldWrapper>
          );
        }}
      />

      <ModalFormButtons isSubmittingForm={isSubmittingForm} onClose={onClose} />
    </form>
  );
};
