'use client';
import { css } from '@cerberus/styled-system/css';
import { InformationFilled } from '@cerberus/icons';
import { flex } from '@cerberus/styled-system/patterns';
import { Show, Tooltip } from '@cerberus/react';
import { useState } from 'react';
import { EditReportingInstructions } from './components/EditReportingInstructions';
import type { CohortData } from '../../cohort.types';
import { ViewDetails } from './components/ViewDetails/ViewDetails';
import { DetailCard } from './DetailCard/DetailCard';
import { UploadForm } from './components/UploadForm/UploadForm';

const REPORTING_INSTRUCTIONS =
  'Include reporting instructions with relevant details and upload a file for Learners to access and download.';

type ClassroomDetailsProps = {
  cohort: CohortData;
  onDetailsUpdate: () => Promise<void>;
};

export const ClassroomDetails = ({
  cohort,
  onDetailsUpdate
}: ClassroomDetailsProps) => {
  const isLoading = !cohort;

  const [
    showEditReportingInstructionsState,
    setShowEditReportingInstructionsState
  ] = useState<boolean>(false);
  const [attachedFile, setAttachedFile] = useState(null);

  const handleEditClick = () => {
    setShowEditReportingInstructionsState(true);
  };

  const [isSubmittingEdits, setIsSubmittingEdits] = useState<boolean>(false);
  const [
    didReportingInstructionsUploadError,
    setDidReportingInstructionsUploadError
  ] = useState<boolean>(false);
  const [didUploadReportingInstructions, setDidUploadReportingInstructions] =
    useState<boolean>(false);

  const handleUploadFormSubmission = async () => {
    setIsSubmittingEdits(true);

    const formattedFormData = new FormData();

    formattedFormData.append('file', attachedFile);
    formattedFormData.append('cohortId', cohort.id);
    formattedFormData.append('uploadType', 'File');

    try {
      await fetch('/admin/api/marketplace/library-items', {
        method: 'POST',
        body: formattedFormData
      });
    } catch (error) {
      setDidReportingInstructionsUploadError(Boolean(error));
    } finally {
      setDidUploadReportingInstructions(true);
      setIsSubmittingEdits(false);
      setAttachedFile(null);
    }
  };

  const handleEditFormSubmission = async () => {
    const requests: Promise<void | unknown>[] = [onDetailsUpdate()];

    if (attachedFile) {
      requests.push(handleUploadFormSubmission());
    }

    await Promise.all(requests);
  };

  return (
    <>
      <div className={flex()}>
        <h2 className={css({ textStyle: 'h4', mr: 4 })}>
          Reporting Instructions
        </h2>
        <Tooltip position="top" content={REPORTING_INSTRUCTIONS}>
          <InformationFilled size={16} />
        </Tooltip>
      </div>

      <div className={flex({ gap: 4, mt: 10 })}>
        <DetailCard isLoading={isLoading} width="2/3">
          <Show when={!showEditReportingInstructionsState}>
            <ViewDetails cohort={cohort} onEdit={handleEditClick} />
          </Show>

          <Show when={showEditReportingInstructionsState}>
            <EditReportingInstructions
              cohortData={cohort}
              afterSubmit={handleEditFormSubmission}
              onClose={() => setShowEditReportingInstructionsState(false)}
            />
          </Show>
        </DetailCard>

        <Show when={showEditReportingInstructionsState}>
          <DetailCard width="1/3">
            <UploadForm
              isUploading={isSubmittingEdits}
              didError={didReportingInstructionsUploadError}
              didUpload={didUploadReportingInstructions}
              attachedFile={attachedFile}
              onAttachFile={file => setAttachedFile(file)}
            />
          </DetailCard>
        </Show>
      </div>
    </>
  );
};
