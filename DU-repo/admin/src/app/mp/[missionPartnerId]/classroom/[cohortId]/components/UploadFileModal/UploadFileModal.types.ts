import type { CohortData } from '../../cohort.types';

export type UploadFileModalProps = {
  title: string;
  description?: string;
  cohortId: CohortData['id'];
  visible: boolean;
  onClose: () => void;
};

export enum FORM_INPUTS {
  'DISPLAY_NAME' = 'Display Name',
  'DOCUMENT_TYPE' = 'Document Type',
  'URL_LINK' = 'URL Link',
  'ATTACHED_FILE' = 'ATTACHED_FILE'
}

export type LinkFormSubmissionData = {
  [FORM_INPUTS.URL_LINK]: string;
};

export enum FORM_TYPES {
  UPLOAD = 'UPLOAD',
  LINK = 'LINK'
}
