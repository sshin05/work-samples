import { Controller, useForm } from 'react-hook-form';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { TextInput } from '@/components_new/form';
import { Button } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { StandardModalHeader } from '@/components_new/modals/StandardModalHeader';

export const CreateNewVendorModalContent = ({ onSubmit, onClose }) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting }
  } = useForm();

  return (
    <div className={vstack({ gap: '4', alignItems: 'flex-start' })}>
      <StandardModalHeader title="New Vendor" onClose={onClose} />
      <form
        className={vstack({ gap: '8', alignItems: 'flex-start' })}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="vendor"
          control={control}
          rules={{
            required: 'The vendor name is required.'
          }}
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <TextInput
              {...field}
              className={css({ mr: '2', w: '31rem' })}
              label="Vendor Name"
              placeholder="Vendor name"
              errorMessage={error?.message}
              required
            />
          )}
        />
        <div className={hstack({ w: 'full', justifyContent: 'flex-start' })}>
          <Button
            type="submit"
            palette="action"
            shape="rounded"
            usage="filled"
            disabled={isSubmitting}
          >
            Add
          </Button>
          <Button
            palette="action"
            shape="rounded"
            usage="outlined"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
