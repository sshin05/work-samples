import { useEffect } from 'react';
import {
  Button,
  useNotificationCenter,
  Modal,
  trapFocus,
  useModal
} from '@cerberus/react';
import { Copy } from '@cerberus/icons';
import { vstack, hstack } from '@cerberus/styled-system/patterns';
import { css, cx } from '@cerberus/styled-system/css';
import { Controller, useForm } from 'react-hook-form';
import { AccessCodeField } from './components/AccessCodeField';
import { useUpdateMissionPartner } from '@/api/mission-partner';
import { useUnsavedChangesPrompt } from '@/hooks/useUnsavedChangesPrompt';
import { UpdateAccessCodeModalContent } from './components/UpdateAccessCodeModalContent';
import { containerStyles } from '@/app/styles/ContainerStyles';
import { TextArea } from '@/components_new/form';

const UpdateDescriptionAndAccessCode = ({ missionPartner }) => {
  const { updateMissionPartner, updateMissionPartnerLoading } =
    useUpdateMissionPartner();

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isDirty }
  } = useForm({
    defaultValues: {
      copy: missionPartner?.description,
      accessCode: missionPartner?.accessCode
    }
  });
  const accessCode = watch('accessCode');
  const { notify } = useNotificationCenter();

  const updateAccessCodeModal = useModal();
  const handleKeyDown = trapFocus(updateAccessCodeModal.modalRef);

  useEffect(() => {
    setValue('accessCode', missionPartner?.accessCode);
    setValue('copy', missionPartner?.description);
  }, [missionPartner?.accessCode, missionPartner?.description, setValue]);

  useUnsavedChangesPrompt(isDirty);

  const isLoading = isSubmitting || updateMissionPartnerLoading;

  const MAX_INPUT_LENGTH = 300;

  const handleSubmitForm = async data => {
    try {
      await updateMissionPartner({
        id: missionPartner.id,
        description: data.copy
      });

      notify({
        palette: 'success',
        heading: 'Success',
        description: 'Your changes have been saved.'
      });
    } catch {
      notify({
        palette: 'danger',
        heading: 'Error',
        description: 'There was an error updating mission partner.'
      });
    }
  };

  const handleUpdateAccessCode = async updatedAccessCode => {
    setValue('accessCode', updatedAccessCode);
    updateAccessCodeModal.close();
  };

  const copyDescription = desc => {
    if (!desc) {
      notify({
        palette: 'danger',
        heading: 'Error',
        description: 'Please add a description first.'
      });
      return;
    }

    try {
      navigator.clipboard?.writeText(desc);
      notify({
        palette: 'success',
        heading: 'Success',
        description: 'Copied to clipboard.'
      });
    } catch {
      notify({
        palette: 'danger',
        heading: 'Error',
        description: 'There was an error copying to clipboard.'
      });
    }
  };

  return (
    <div
      className={cx(
        css({
          minW: 'fit-content',
          maxW: '50%',
          flex: '1'
        }),
        containerStyles
      )}
    >
      <form
        className={vstack({
          maxW: 'full',
          h: 'full',
          gap: '6',
          alignItems: 'flex-start',
          p: '6'
        })}
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <Controller
          name="copy"
          control={control}
          rules={{
            maxLength: {
              value: MAX_INPUT_LENGTH,
              message: `${MAX_INPUT_LENGTH} character limit exceeded`
            },
            required: 'Description is required'
          }}
          render={({ field: { ref, ...field }, fieldState: { error } }) => {
            return (
              <div
                className={hstack({
                  alignItems: 'flex-start'
                })}
              >
                <TextArea
                  {...field}
                  label="Description"
                  rows={8}
                  required
                  inputLength={field?.value?.length}
                  maxLength={MAX_INPUT_LENGTH}
                  helpText="Text on this page shows on student portal landing page"
                  errorMessage={error?.message}
                  className={css({ w: '25.6rem' })}
                />
                <Copy
                  className={css({
                    ml: '-2.5rem',
                    mt: '9',
                    zIndex: 1,
                    cursor: 'pointer'
                  })}
                  onClick={() => copyDescription(field?.value)}
                />
              </div>
            );
          }}
        />
        <div
          className={vstack({
            gap: '0',
            alignItems: 'flex-start'
          })}
        >
          <div
            className={hstack({
              h: 'full',
              gap: '1',
              alignItems: 'center'
            })}
          >
            <AccessCodeField
              accessCode={accessCode}
              helpText="Copy this code and send it to learners to give access to the training hub"
              notify={notify}
            />
            <Button
              className={css({ pos: 'relative', right: '1rem' })}
              type="button"
              palette="action"
              shape="rounded"
              usage="ghost"
              onClick={updateAccessCodeModal.show}
              disabled={isLoading}
            >
              Update Code
            </Button>
          </div>
        </div>
        <Button
          type="submit"
          palette="action"
          shape="rounded"
          usage="outlined"
          disabled={isLoading}
        >
          Save
        </Button>
      </form>
      <Modal onKeyDown={handleKeyDown} ref={updateAccessCodeModal.modalRef}>
        {updateAccessCodeModal.isOpen && (
          <UpdateAccessCodeModalContent
            missionPartnerId={missionPartner?.id}
            updateAccessCode={handleUpdateAccessCode}
            close={updateAccessCodeModal.close}
            notify={notify}
          />
        )}
      </Modal>
    </div>
  );
};

export default UpdateDescriptionAndAccessCode;
