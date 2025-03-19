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
import { useCreateDomain } from '@/api/dcwf/domain/useCreateDomain';

interface CreateDomainModalProps {
  createDomainModal: UseModalReturnValue;
}

export const CreateDomainModal = ({
  createDomainModal
}: CreateDomainModalProps) => {
  const { createDomain, createDomainLoading } = useCreateDomain();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { name: '', shortDescription: '', description: '' }
  });
  const { notify } = useNotificationCenter();

  const handleSubmitDomain = async data => {
    await createDomain(data)
      .then(() => {
        notify({
          palette: 'success',
          heading: 'Success',
          description: 'Successfully created Domain'
        });
        onClose();
      })
      .catch(() => {
        notify({
          palette: 'danger',
          heading: 'Error',
          description: 'Failed to create Domain'
        });
        onClose();
      });
  };

  const onClose = () => {
    reset();
    createDomainModal.close();
  };

  return (
    <CustomModal
      customModal={createDomainModal}
      title="Create Domain"
      onClose={onClose}
    >
      <form
        className={vstack({ gap: '6', alignItems: 'flex-start', w: 'full' })}
        onSubmit={handleSubmit(handleSubmitDomain)}
      >
        <Controller
          name="name"
          control={control}
          rules={{
            required: 'The title is required.'
          }}
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <TextInput
              {...field}
              label="Enter Domain title"
              errorMessage={error?.message}
              required
            />
          )}
        />
        <Controller
          name="shortDescription"
          control={control}
          rules={{
            required: 'The description is required.'
          }}
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <TextArea
              {...field}
              className={css({ w: '31.2rem' })}
              label="Enter a short Domain description"
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
              label="Enter a full Domain description"
              errorMessage={error?.message}
              required
            />
          )}
        />
        <div className={hstack({ gap: '4' })}>
          <Button
            type="submit"
            palette="action"
            shape="rounded"
            usage="filled"
            disabled={createDomainLoading}
          >
            Create Domain
          </Button>
          <Button
            type="button"
            palette="action"
            shape="rounded"
            usage="outlined"
            disabled={createDomainLoading}
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </form>
    </CustomModal>
  );
};
