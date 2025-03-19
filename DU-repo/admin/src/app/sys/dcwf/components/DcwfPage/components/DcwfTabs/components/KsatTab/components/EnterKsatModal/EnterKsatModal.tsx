import { TextArea, TextInput, FieldSelect } from '@/components_new/form';
import { CustomModal } from '@/components_new/modals/CustomModal';
import {
  Field,
  type UseModalReturnValue,
  Button,
  useNotificationCenter
} from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { useForm, Controller } from 'react-hook-form';
import { type Ksat, KsatType } from '@/api/codegen/graphql';
import { useCreateKsat } from '@/api/dcwf/ksat/useCreateKsat';
import { useUpdateKsat } from '@/api/dcwf/ksat/useUpdateKsat';

interface EnterKsatModalProps {
  modal: UseModalReturnValue;
  ksat?: Ksat;
}

export const EnterKsatModal = ({ modal, ksat }: EnterKsatModalProps) => {
  const { createKsat, createKsatLoading } = useCreateKsat();
  const { updateKsat, updateKsatLoading } = useUpdateKsat();

  const loading = createKsatLoading || updateKsatLoading;

  const { control, handleSubmit, reset } = useForm({
    values: {
      code: ksat?.code || '',
      ksatType: ksat?.ksatType || '',
      description: ksat?.description || ''
    }
  });
  const { notify } = useNotificationCenter();

  const handleSubmitKsat = async (data: Ksat) => {
    if (ksat) {
      handleUpdateKsat(data, ksat.id);
    } else {
      handleCreateKsat(data);
    }
  };

  const handleCreateKsat = async (data: Ksat) => {
    await createKsat(data)
      .then(() => {
        notify({
          palette: 'success',
          heading: 'Success',
          description: 'KSAT entered successfully'
        });
        onClose();
      })
      .catch(() => {
        notify({
          palette: 'danger',
          heading: 'Error',
          description: 'Failed to enter KSAT'
        });
        // NOTE: user will lose entered data, but the error message isn't visible with the modal up
        onClose();
      });
  };

  const handleUpdateKsat = async (data: Ksat, ksatId) => {
    await updateKsat(ksatId, data)
      .then(() => {
        notify({
          palette: 'success',
          heading: 'Success',
          description: 'KSAT updated successfully'
        });
        onClose();
      })
      .catch(() => {
        notify({
          palette: 'danger',
          heading: 'Error',
          description: 'Failed to update KSAT'
        });
        onClose();
      });
  };

  const onClose = () => {
    reset();
    modal.close();
  };

  return (
    <CustomModal
      customModal={modal}
      title={ksat ? 'Edit KSAT' : 'Enter KSAT'}
      onClose={onClose}
    >
      <form
        className={vstack({ gap: '6', alignItems: 'flex-start', w: 'full' })}
        onSubmit={handleSubmit(handleSubmitKsat)}
      >
        <Controller
          name="code"
          control={control}
          rules={{
            required: 'The code is required.'
          }}
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <TextInput
              {...field}
              label="KSAT Code"
              errorMessage={error?.message}
              required
            />
          )}
        />
        <Controller
          name="ksatType"
          control={control}
          rules={{
            required: 'The type is required.'
          }}
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <Field>
              <div className={css({ gap: 0, w: '50%' })}>
                <FieldSelect
                  {...field}
                  label="Type"
                  options={Object.values(KsatType).map(type => ({
                    value: type,
                    label: type
                  }))}
                  errorMessage={error?.message}
                  placeholder="Choose an option"
                  required
                />
              </div>
            </Field>
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
              label="Description"
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
            disabled={loading}
            // TODO: When cerberus is upgraded, pending will disable the button and show a spinner
            // pending={loading}
          >
            {ksat ? 'Update KSAT' : 'Enter KSAT'}
          </Button>
          <Button
            type="button"
            palette="action"
            shape="rounded"
            usage="outlined"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </form>
    </CustomModal>
  );
};
