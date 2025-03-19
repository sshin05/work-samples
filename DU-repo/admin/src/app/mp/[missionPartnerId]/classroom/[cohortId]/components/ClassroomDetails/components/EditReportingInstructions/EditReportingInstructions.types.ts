import type { CohortData } from '../../../../cohort.types';

export type EditReportingInstructionsProps = {
  cohortData: CohortData;
  onClose: () => void;
  afterSubmit: () => Promise<void>;
};

export enum FORM_INPUTS {
  'START_DATE' = 'Start Date',
  'END_DATE' = 'End Date',
  'MEETING_DETAILS' = 'Additional Details',
  'MEETING_LOCATION' = 'Meeting Location',
  'DATE_DETAILS' = 'Date Details'
}

export type FormSubmissionData = {
  [FORM_INPUTS.START_DATE]: string;
  [FORM_INPUTS.END_DATE]: string;
  [FORM_INPUTS.MEETING_DETAILS]?: string;
  [FORM_INPUTS.MEETING_LOCATION]?: string;
  [FORM_INPUTS.DATE_DETAILS]?: string;
};
