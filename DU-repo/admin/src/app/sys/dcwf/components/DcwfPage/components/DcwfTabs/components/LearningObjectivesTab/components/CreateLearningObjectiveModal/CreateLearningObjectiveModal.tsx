import { TextArea } from '@/components_new/form';
import { CustomModal } from '@/components_new/modals/CustomModal';
import {
  Button,
  type UseModalReturnValue,
  useNotificationCenter
} from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { Controller, useForm } from 'react-hook-form';
import { useCreateLearningObjective } from '@/api/dcwf/learning-objective/useCreateLearningObjective';

interface CreateLearningObjectiveProps {
  createLearningObjectiveModal: UseModalReturnValue;
}

export const CreateLearningObjectiveModal = ({
  createLearningObjectiveModal
}: CreateLearningObjectiveProps) => {
  const { createLearningObjective, createLearningObjectiveLoading } =
    useCreateLearningObjective();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: { description: '' }
  });
  const { notify } = useNotificationCenter();

  const handleSubmitLearningObjective = async _data => {
    await createLearningObjective(_data)
      .then(() => {
        notify({
          palette: 'success',
          heading: 'Success',
          description: 'Successfully created Learning Objective'
        });
        onClose();
      })
      .catch(() => {
        notify({
          palette: 'danger',
          heading: 'Error',
          description: 'Failed to create Learning Objective'
        });
        onClose();
      });
  };

  const onClose = () => {
    reset();
    createLearningObjectiveModal.close();
  };

  return (
    <CustomModal
      customModal={createLearningObjectiveModal}
      title="Create Learning Objective"
      onClose={onClose}
    >
      <form
        className={vstack({ gap: '6', alignItems: 'flex-start', w: 'full' })}
        onSubmit={handleSubmit(handleSubmitLearningObjective)}
      >
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
              label="Enter a Learning Objective description"
              errorMessage={error?.message}
              required
            />
          )}
        />
        <div className={hstack({ gap: '4', mt: '8' })}>
          <Button
            type="submit"
            palette="action"
            shape="rounded"
            usage="filled"
            disabled={createLearningObjectiveLoading}
          >
            Create Learning Objective
          </Button>
          <Button
            type="button"
            palette="action"
            shape="rounded"
            usage="outlined"
            disabled={createLearningObjectiveLoading}
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </form>
    </CustomModal>
  );
};
