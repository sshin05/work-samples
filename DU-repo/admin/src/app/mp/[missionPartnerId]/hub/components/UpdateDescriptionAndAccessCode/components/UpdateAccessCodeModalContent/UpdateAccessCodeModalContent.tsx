import { Button } from '@cerberus/react';
import { vstack, hstack } from '@cerberus/styled-system/patterns';
import { TextInput } from '@/components_new/form';
import { Controller, useForm } from 'react-hook-form';
import { useUpdateMissionPartner } from '@/api/mission-partner';
import { css } from '@cerberus/styled-system/css';
import { StandardModalHeader } from '@/components_new/modals/StandardModalHeader';

export const UpdateAccessCodeModalContent = ({
  missionPartnerId,
  close,
  notify,
  updateAccessCode
}) => {
  const { updateMissionPartner } = useUpdateMissionPartner();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: {
      code: ''
    }
  });

  const handleClose = () => {
    close();
    reset({ code: '' });
  };

  const handleUpdateAccessCode = ({ code }) => {
    return updateMissionPartner({
      id: missionPartnerId,
      accessCode: code
    })
      .then(() => {
        notify({
          palette: 'success',
          heading: 'Success',
          description: 'Updated access code.'
        });
      })
      .catch(() => {
        notify({
          palette: 'danger',
          heading: 'Error',
          description: 'Something went wrong. Try again.'
        });
      })
      .finally(() => {
        updateAccessCode(code);
        handleClose();
      });
  };

  return (
    <div
      className={vstack({
        gap: '8',
        alignItems: 'flex-start'
      })}
    >
      <StandardModalHeader title="Access Code" onClose={handleClose} />
      <form
        className={vstack({
          gap: '8',
          alignItems: 'flex-start'
        })}
        onSubmit={handleSubmit(handleUpdateAccessCode)}
      >
        <Controller
          name="code"
          control={control}
          rules={{
            required: 'The code is required.',
            minLength: {
              value: 12,
              message: 'Access code must be at least 12 characters'
            }
          }}
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <TextInput
              {...field}
              className={css({ w: '31rem' })}
              placeholder="1234ABC 67890XYZ"
              label="Update Code"
              errorMessage={error?.message}
              autoComplete="off"
              required
            />
          )}
        />
        <div className={hstack()}>
          <Button
            className={css({
              fontSize: '1rem',
              fontWeight: 'medium',
              mr: '4'
            })}
            palette="action"
            shape="rounded"
            usage="filled"
            type="submit"
            disabled={isSubmitting}
          >
            Save
          </Button>
          <Button
            className={css({
              fontSize: '1rem',
              fontWeight: 'medium'
            })}
            palette="action"
            shape="rounded"
            usage="outlined"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
