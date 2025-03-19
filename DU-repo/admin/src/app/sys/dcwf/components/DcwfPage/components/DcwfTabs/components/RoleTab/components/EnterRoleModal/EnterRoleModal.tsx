import { TextArea, TextInput } from '@/components_new/form';
import { CustomModal } from '@/components_new/modals/CustomModal';
import {
  Button,
  type UseModalReturnValue,
  useNotificationCenter
} from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { Controller, useForm } from 'react-hook-form';
import { useCreateJobRole } from '@/api/dcwf/role/useCreateJobRole';

interface EnterRoleModalProps {
  enterRoleModal: UseModalReturnValue;
}

export const EnterRoleModal = ({ enterRoleModal }: EnterRoleModalProps) => {
  const { createJobRole, createJobRoleLoading } = useCreateJobRole();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { roleId: '', name: '', description: '' }
  });
  const { notify } = useNotificationCenter();

  const handleSubmitRole = async _data => {
    await createJobRole(_data)
      .then(() => {
        notify({
          palette: 'success',
          heading: 'Success',
          description: 'Successfully entered Role'
        });
        onClose();
      })
      .catch(() => {
        notify({
          palette: 'danger',
          heading: 'Error',
          description: 'Failed to enter Role'
        });
        onClose();
      });
  };

  const onClose = () => {
    reset();
    enterRoleModal.close();
  };

  return (
    <CustomModal
      customModal={enterRoleModal}
      title="Enter Role"
      onClose={onClose}
    >
      <form
        className={vstack({ gap: '6', alignItems: 'flex-start', w: 'full' })}
        onSubmit={handleSubmit(handleSubmitRole)}
      >
        <Controller
          name="roleId"
          control={control}
          rules={{
            required: 'The ID is required.'
          }}
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <TextInput
              {...field}
              label="Enter Role ID"
              errorMessage={error?.message}
              required
            />
          )}
        />
        <Controller
          name="name"
          control={control}
          rules={{
            required: 'The title is required.'
          }}
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <TextInput
              {...field}
              label="Enter Role title"
              errorMessage={error?.message}
              required
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          rules={{
            required: 'The description is required.'
          }}
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <TextArea
              {...field}
              className={css({ w: '31.2rem' })}
              label="Enter a Role description"
              errorMessage={error?.message}
              required
            />
          )}
        />
        <div className={hstack({ gap: '4', mt: '6' })}>
          <Button
            type="submit"
            palette="action"
            shape="rounded"
            usage="filled"
            disabled={createJobRoleLoading}
          >
            Enter Role
          </Button>
          <Button
            type="button"
            palette="action"
            shape="rounded"
            usage="outlined"
            disabled={createJobRoleLoading}
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </form>
    </CustomModal>
  );
};
