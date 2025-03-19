import { TextInput } from '@/components_new/form';
import { StandardModalHeader } from '@/components_new/modals/StandardModalHeader';
import { Button } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { Controller, useForm } from 'react-hook-form';

interface AddModuleModalContentProps {
  close: () => void;
  handleClickCreateModule: (data: { moduleName: string }) => Promise<void>;
}

export const AddModuleModalContent = ({
  close,
  handleClickCreateModule
}: AddModuleModalContentProps) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = useForm({
    defaultValues: {
      moduleName: ''
    }
  });

  const handleCreateModule = async data => {
    await handleClickCreateModule(data);
  };

  const onClose = () => {
    reset();
    close();
  };

  return (
    <>
      <StandardModalHeader title="Add module" onClose={onClose} />
      <form
        className={vstack({ gap: '8', alignItems: 'flex-start', mt: '6' })}
        onSubmit={handleSubmit(handleCreateModule)}
      >
        <Controller
          name="moduleName"
          control={control}
          rules={{ required: 'Module title is required' }}
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <TextInput
              {...field}
              className={css({ w: '31rem' })}
              label="Module title"
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
            disabled={isSubmitting}
          >
            Submit
          </Button>
          <Button
            type="button"
            palette="action"
            shape="rounded"
            usage="outlined"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};
