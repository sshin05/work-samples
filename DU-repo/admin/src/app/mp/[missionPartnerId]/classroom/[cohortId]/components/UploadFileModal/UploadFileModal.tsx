import {
  Modal,
  ModalHeader,
  ModalHeading,
  useModal,
  trapFocus,
  Button,
  IconButton,
  ModalDescription,
  Input,
  Spinner
} from '@cerberus/react';
import { useEffect, useState } from 'react';
import { css } from '@cerberus/styled-system/css';
import { flex, hstack } from '@cerberus/styled-system/patterns';
import { Controller, useForm } from 'react-hook-form';
import {
  type UploadFileModalProps,
  type LinkFormSubmissionData,
  FORM_INPUTS,
  FORM_TYPES
} from './UploadFileModal.types';
import { Close } from '@cerberus/icons';
import { FormTypeSelector } from './components/FormTypeSelector/FormTypeSelector';
import { UploadForm } from './components/UploadForm/UploadForm';
import { FormFieldWrapper } from '../FormFieldWrapper';

export const UploadFileModal = ({
  title,
  description,
  cohortId,
  visible,
  onClose
}: UploadFileModalProps) => {
  const { modalRef, show: showModal, close: closeModal } = useModal();

  const [formType, setFormType] = useState<FORM_TYPES>(FORM_TYPES.UPLOAD);
  const [attachedFileRequiredError, setAttachedFileRequiredError] =
    useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  const [didUploadFile, setDidUploadFile] = useState<boolean>(false);
  const [isAddingLibraryItem, setIsAddingLibraryItem] =
    useState<boolean>(false);
  const [addLibraryItemError, setAddLibraryItemError] = useState<string | null>(
    null
  );

  const {
    control: formControl,
    handleSubmit,
    reset: resetForm,
    formState: { isSubmitting }
  } = useForm();

  const editModalHandleKeyDown = trapFocus(modalRef);

  useEffect(() => {
    if (visible) {
      showModal();
    } else {
      closeModal();
      resetForm();
    }
  }, [closeModal, resetForm, showModal, visible]);

  const handleUploadFormSubmission = async () => {
    setIsAddingLibraryItem(true);
    const formattedFormData = new FormData();

    formattedFormData.append('file', attachedFile);
    formattedFormData.append('cohortId', cohortId);
    formattedFormData.append('uploadType', 'File');

    try {
      await fetch('/admin/api/marketplace/library-items', {
        method: 'POST',
        body: formattedFormData
      });
    } catch (error) {
      setAddLibraryItemError(error);
    } finally {
      setDidUploadFile(true);
      setIsAddingLibraryItem(false);
      onClose();
      setAttachedFile(null);
    }
    console.log(
      'handleUploadFormSubmission formData: ',
      formattedFormData,
      cohortId
    );
  };

  const handleLinkFormSubmission = async (formData: LinkFormSubmissionData) => {
    // TODO: Handle upload when endpoint implemented
    console.log(' handleLinkFormSubmissionformData: ', formData, cohortId);
  };

  const handleFormSubmission = async (formData: LinkFormSubmissionData) => {
    if (!attachedFile) {
      setAttachedFileRequiredError(true);
    }

    if (formType === FORM_TYPES.UPLOAD) {
      return handleUploadFormSubmission();
    } else {
      const linkFormData: LinkFormSubmissionData = {
        [FORM_INPUTS.URL_LINK]: formData[FORM_INPUTS.URL_LINK]
      };

      return handleLinkFormSubmission(linkFormData);
    }
  };

  const handleFormTypeChange = (formType: FORM_TYPES): void => {
    setFormType(formType);
  };

  const handleAttachFile = file => {
    setAttachedFile(file);

    if (file) {
      setAttachedFileRequiredError(false);
    }
  };

  return (
    <Modal
      onKeyDown={editModalHandleKeyDown}
      ref={modalRef}
      className={css({ w: '640px' })}
    >
      <ModalHeader>
        <ModalHeading className={hstack({ w: 'full' })}>
          {title}
          <IconButton
            ariaLabel="Close"
            size="lg"
            palette="action"
            usage="ghost"
            onClick={onClose}
            className={css({
              alignSelf: 'start',
              ml: 'auto',
              cursor: 'pointer'
            })}
          >
            <Close size={24} />
          </IconButton>
        </ModalHeading>
      </ModalHeader>

      {description && (
        <ModalDescription
          className={css({
            textStyle: 'body-sm',
            color: 'page.text.100'
          })}
        >
          {description}
        </ModalDescription>
      )}

      <form
        onSubmit={handleSubmit(handleFormSubmission)}
        className={css({ pt: '6' })}
      >
        <FormTypeSelector
          selectedFormType={formType}
          onChange={handleFormTypeChange}
        />

        {formType === FORM_TYPES.UPLOAD && (
          <UploadForm
            attachedFile={attachedFile}
            onAttachFile={handleAttachFile}
            displayRequiredError={attachedFileRequiredError}
            isUploading={isAddingLibraryItem}
            didError={Boolean(addLibraryItemError)}
            didUpload={didUploadFile}
          />
        )}

        {formType === FORM_TYPES.LINK && (
          <Controller
            name={FORM_INPUTS.URL_LINK}
            control={formControl}
            defaultValue=""
            rules={{ required: false }}
            render={({ field: { ref, ...field }, fieldState }) => {
              return (
                <div
                  className={css({
                    mt: 4
                  })}
                >
                  <FormFieldWrapper
                    fieldState={fieldState}
                    fieldName={FORM_INPUTS.URL_LINK}
                    showOptionalTag
                  >
                    <Input
                      id={FORM_INPUTS.URL_LINK}
                      placeholder=""
                      type="text"
                      {...field}
                    />
                  </FormFieldWrapper>
                </div>
              );
            }}
          />
        )}

        <div
          className={flex({
            mt: 8
          })}
        >
          <Button
            disabled={isSubmitting}
            palette="action"
            shape="rounded"
            usage="filled"
            type="submit"
            className={hstack({
              mr: '4'
            })}
          >
            {isSubmitting && <Spinner size="1em" />}
            Add
          </Button>
          <Button
            usage="outlined"
            shape="rounded"
            onClick={onClose}
            type="button"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};
