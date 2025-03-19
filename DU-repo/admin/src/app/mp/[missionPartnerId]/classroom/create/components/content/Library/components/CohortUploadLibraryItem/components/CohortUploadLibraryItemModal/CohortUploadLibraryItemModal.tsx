import { CreateCohortContext } from '@/app/mp/[missionPartnerId]/classroom/create/providers/CreateCohortProvider/CreateCohortProvider';
import { LibraryItemFormFields } from '@/app/mp/[missionPartnerId]/training/plan/[type]/[id]/components/LibraryItemsTab/components/AddLibraryItemModalContent/components/LibraryItemFormFields';
import {
  Button,
  FieldMessage,
  Input,
  Modal,
  ModalHeader,
  ModalHeading,
  Portal,
  Spinner,
  Tab,
  TabPanel,
  Tabs,
  TabsList,
  useNotificationCenter
} from '@cerberus/react';
import { flex, hstack, vstack } from '@cerberus/styled-system/patterns';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { CohortLibraryFileDropzone } from './components/CohortLibraryFileDropzone';
import type { CohortUploadLibraryItemModalProps } from './cohortUploadLibraryItemModal.types';
import { CreateCohortStateReducerActionTypes } from '@/app/mp/[missionPartnerId]/classroom/create/providers/CreateCohortProvider/CreateCohortProvider.types';
import {
  FORM_INPUTS,
  FORM_TYPES,
  type LinkFormSubmissionData
} from '@/app/mp/[missionPartnerId]/classroom/[cohortId]/components/UploadFileModal/UploadFileModal.types';
import { css } from '@cerberus/styled-system/css';
import { FormFieldWrapper } from '@/app/mp/[missionPartnerId]/classroom/[cohortId]/components/FormFieldWrapper';
import axios from 'axios';
import { useSQLMutation } from '@/app/api';
import { sqlAddLibraryItem } from '@/app/api/cohorts';
import type { LibraryItem } from '@/app/mp/[missionPartnerId]/classroom/[cohortId]/cohort.types';

export const CohortUploadLibraryItemModal = ({
  modalRef,
  close,
  show,
  isOpen
}: CohortUploadLibraryItemModalProps) => {
  const { createCohortState, updateCohortState } =
    useContext(CreateCohortContext);
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

  const { mutation: addLibraryItem } = useSQLMutation(sqlAddLibraryItem);
  const { notify } = useNotificationCenter();
  const {
    control: formControl,
    handleSubmit,
    reset: resetForm,
    setValue,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: {
      displayName: '',
      type: formType === FORM_TYPES.UPLOAD ? 'File' : 'Link',
      [FORM_INPUTS.URL_LINK]: ''
    }
  });

  const onClose = useCallback(() => {
    close();
    resetForm();
    setAttachedFile(null);
    setFormType(FORM_TYPES.UPLOAD);
    setValue('type', 'File');
  }, [close, resetForm, setValue]);

  useEffect(() => {
    if (isOpen) {
      show();
      setDidUploadFile(false);
    } else {
      onClose();
    }
  }, [close, isOpen, onClose, resetForm, show]);

  const handleUploadFormSubmission = async data => {
    setIsAddingLibraryItem(true);

    try {
      if (!attachedFile) {
        throw new Error('No file uploaded');
      }

      const type = data.type === 'File' ? 'Document' : data.type;
      const formattedFormData = new FormData();
      formattedFormData.append('file', attachedFile);
      formattedFormData.append('type', type);
      formattedFormData.append('displayName', data.displayName);
      formattedFormData.append('cohortId', createCohortState.id);

      const response = await axios.post(
        '/admin/api/cohorts/add-file-library-item',
        formattedFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      const savedItem: LibraryItem = response.data.savedItem;
      updateCohortState({
        type: CreateCohortStateReducerActionTypes.UPDATE_LIBRARY_ITEMS,
        payload: [...createCohortState.libraryItems, savedItem]
      });

      notify({
        palette: 'success',
        heading: 'Success',
        description: 'A library item has been added'
      });

      setDidUploadFile(true);
      onClose();
    } catch (error) {
      setAddLibraryItemError(error.message);
      setDidUploadFile(false);

      notify({
        palette: 'danger',
        heading: 'Error',
        description: 'There was an error adding the library item'
      });
    } finally {
      setIsAddingLibraryItem(false);
    }
  };

  const handleLinkFormSubmission = async data => {
    setIsAddingLibraryItem(true);

    try {
      const savedItem = await addLibraryItem({
        cohortId: createCohortState.id,
        source: data[FORM_INPUTS.URL_LINK],
        name: data.displayName
      });

      updateCohortState({
        type: CreateCohortStateReducerActionTypes.UPDATE_LIBRARY_ITEMS,
        payload: [...createCohortState.libraryItems, savedItem.data]
      });

      notify({
        palette: 'success',
        heading: 'Success',
        description: 'A library item has been added'
      });

      onClose();
    } catch (error) {
      setAddLibraryItemError(error.message);
      notify({
        palette: 'danger',
        heading: 'Error',
        description: 'There was an error adding the library item'
      });
    } finally {
      setIsAddingLibraryItem(false);
    }
  };

  const handleFormSubmission = async (formData: LinkFormSubmissionData) => {
    if (formType === FORM_TYPES.UPLOAD) {
      if (!attachedFile) {
        setAttachedFileRequiredError(true);
        return;
      }

      return handleUploadFormSubmission(formData);
    } else {
      return handleLinkFormSubmission(formData);
    }
  };

  const handleFormTypeChange = (formType: FORM_TYPES): void => {
    setFormType(formType);

    const newType = formType === FORM_TYPES.UPLOAD ? 'File' : 'Link';
    setValue('type', newType);
  };

  const handleAttachFile = file => {
    setAddLibraryItemError(null); //do not let previous upload error persist through next upload attempt
    setAttachedFile(file);

    if (file) {
      setAttachedFileRequiredError(false);
    }
  };

  return (
    <Portal>
      <Modal ref={modalRef} className={css({ w: '35rem', overflow: 'hidden' })}>
        {isOpen && (
          <>
            <ModalHeader>
              <ModalHeading>Add library item</ModalHeading>
            </ModalHeader>
            <form
              onSubmit={handleSubmit(handleFormSubmission)}
              className={css({ pt: '6' })}
            >
              <Tabs defaultValue="addFile">
                <TabsList>
                  <Tab
                    value="addFile"
                    onClick={() => handleFormTypeChange(FORM_TYPES.UPLOAD)}
                  >
                    Upload a file
                  </Tab>
                  <Tab
                    value="addLink"
                    onClick={() => handleFormTypeChange(FORM_TYPES.LINK)}
                  >
                    Add a link
                  </Tab>
                </TabsList>
                <TabPanel value="addFile" className={css({ pt: '6' })}>
                  {formType === FORM_TYPES.UPLOAD && (
                    <CohortLibraryFileDropzone
                      attachedFile={attachedFile}
                      onAttachFile={handleAttachFile}
                      displayRequiredError={attachedFileRequiredError}
                      isUploading={isAddingLibraryItem}
                      didError={Boolean(addLibraryItemError)}
                      didUpload={didUploadFile}
                    />
                  )}
                </TabPanel>
                <TabPanel value="addLink">
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
                              mt: '6'
                            })}
                          >
                            <FormFieldWrapper
                              fieldState={fieldState}
                              fieldName="URL"
                              isRequired
                            >
                              <Input
                                id={FORM_INPUTS.URL_LINK}
                                placeholder=""
                                type="text"
                                {...field}
                              />
                              <FieldMessage id={`help:${FORM_INPUTS.URL_LINK}`}>
                                Example: www.sampleurl.com
                              </FieldMessage>
                            </FormFieldWrapper>
                          </div>
                        );
                      }}
                    />
                  )}
                </TabPanel>
              </Tabs>
              <div
                className={vstack({
                  mt: '6',
                  gap: '6',
                  alignItems: 'flex-start'
                })}
              >
                <LibraryItemFormFields
                  control={formControl}
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  activeUploadTab={formType === FORM_TYPES.UPLOAD ? 0 : 1}
                  hideType={formType === FORM_TYPES.LINK}
                />
              </div>
              <div
                className={flex({
                  mt: '6'
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
                  {formType === FORM_TYPES.UPLOAD ? 'Upload file' : 'Add link'}
                </Button>
                <Button
                  usage="outlined"
                  shape="rounded"
                  onClick={close}
                  type="button"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </>
        )}
      </Modal>
    </Portal>
  );
};
