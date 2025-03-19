import {
  Modal,
  ModalHeader,
  ModalHeading,
  useModal,
  trapFocus,
  IconButton,
  Button,
  Spinner,
  useNotificationCenter
} from '@cerberus/react';
import { Close } from '@cerberus/icons';
import { css } from '@cerberus/styled-system/css';
import React, { useContext, useEffect, useState } from 'react';
import { flex, hstack } from '@cerberus/styled-system/patterns';
import { UploadForm } from '../../[cohortId]/components/ClassroomDetails/components/UploadForm/UploadForm';
import { useRouteParams } from '@/hooks/useRouteParams';

import type { ParseError } from '../../[cohortId]/components/ClassroomTable/components/LearnersTable/utils/handleBulkUpdate/handleBulkUpdate';
import { useCreateAndAddMembers } from './hooks/useCreateAndAddMembers/useCreateAndAddMembers';
import { parseBulkUploadCsv } from './utils/parseBulkUploadCsv/parseBulkUploadCsv';
import { CreateCohortContext } from '../../create/providers/CreateCohortProvider/CreateCohortProvider';
import type { MemberData } from './AddLearnersModal.types';

type AddLearnersModalProps = {
  displayModal: boolean;
  onClose: () => void;
  onSuccess: (memberData: MemberData[]) => void;
};

export const AddLearnersModal = ({
  displayModal,
  onClose,
  onSuccess
}: AddLearnersModalProps) => {
  const { createCohortState } = useContext(CreateCohortContext);

  const { missionPartnerId } = useRouteParams();
  const { notify } = useNotificationCenter();
  const { modalRef, show: showModal, close: closeModal } = useModal();
  const editModalHandleKeyDown = trapFocus(modalRef);

  const [attachedFileRequiredError, setAttachedFileRequiredError] =
    useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  const [didUploadFile, setDidUploadFile] = useState<boolean>(false);
  const [addMemberError, setAddMemberError] = useState<string | null>(null);
  const [isAddingMembers, setIsAddingMembers] = useState(false);

  const resetModal = () => {
    setAttachedFileRequiredError(false);
    setAttachedFile(null);
    setDidUploadFile(false);
    setAddMemberError(null);
    setIsAddingMembers(false);
  };

  const { createAndAddMembers } = useCreateAndAddMembers();

  const addMembersToCohort = async (newMembers: MemberData[]) => {
    try {
      const createdMembers = await createAndAddMembers({
        cohortId: createCohortState.id,
        missionPartnerId,
        newMembers
      });
      setDidUploadFile(true);
      notify({
        palette: 'success',
        heading: 'Success',
        description: 'Learners have been added.'
      });

      onSuccess(createdMembers);
    } catch {
      setAddMemberError('Failed to add one or more learners to the cohort.');
      notify({
        palette: 'danger',
        heading: 'Error',
        description: 'Failed to add one or more learners to the cohort.'
      });
    } finally {
      setIsAddingMembers(false);
    }
  };

  const parseFile = async () => {
    setIsAddingMembers(true);

    const fileContent = await attachedFile.text();

    try {
      const parsedResult = await parseBulkUploadCsv(fileContent);

      if (parsedResult.success) {
        await addMembersToCohort(parsedResult.bulkUploadList);
      }
    } catch (parsedResult) {
      onBulkUpdateError(parsedResult?.error);
    }
  };

  const onBulkUpdateError = (error: ParseError) => {
    notify({
      palette: 'danger',
      heading: 'Bulk Update',
      description: (
        <>
          <span>{error.message}</span>
          {error.row ? (
            <>
              <br />
              <span>Please verify row {error.row}.</span>
            </>
          ) : null}
        </>
      )
    });
  };

  const handleFormSubmission = async (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (!attachedFile) {
      setAttachedFileRequiredError(true);
      setIsAddingMembers(false);
      return;
    }

    await parseFile();
  };

  const handleAttachFile = file => {
    setAttachedFile(file);

    if (file) {
      setAttachedFileRequiredError(false);
    }
  };

  useEffect(() => {
    if (displayModal) {
      showModal();
    } else {
      resetModal();
      closeModal();
    }
  }, [closeModal, displayModal, showModal]);

  return (
    <Modal
      onKeyDown={editModalHandleKeyDown}
      ref={modalRef}
      className={css({ overflow: 'visible' })}
    >
      <ModalHeader>
        <ModalHeading className={hstack({ w: 'full' })}>
          Add Multpile Learners
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
        <p>
          <a
            href="/admin/assets/user-upload-template.csv"
            download="User Upload Template"
            className={css({ color: 'action.navigation.initial' })}
          >
            Download a .csv template
          </a>{' '}
          to upload many learners at once.
        </p>{' '}
      </ModalHeader>
      <form onSubmit={handleFormSubmission} className={css({ pt: '6' })}>
        {/* Handle edge case: force Cerberus form input to unmount, allowing user to upload file with the same name after closing */}
        {displayModal && (
          <UploadForm
            attachedFile={attachedFile}
            onAttachFile={handleAttachFile}
            displayRequiredError={attachedFileRequiredError}
            isUploading={isAddingMembers}
            didError={Boolean(addMemberError)}
            didUpload={didUploadFile}
          />
        )}

        <div
          className={flex({
            mt: 8
          })}
        >
          <Button
            disabled={isAddingMembers}
            palette="action"
            shape="rounded"
            usage="filled"
            type="submit"
            className={hstack({
              mr: '4'
            })}
          >
            {isAddingMembers && <Spinner size="1em" />}
            Upload File
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
