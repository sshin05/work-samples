import {
  type FormSubmissionData,
  FORM_INPUTS
} from '../../EditReportingInstructions.types';
import { formatAsDate } from '@/app/marketplace/utils/formatAsDate/formatAsDate';

export type FormatFormDataForSave = {
  formData: FormSubmissionData;
};

type FormatFormDataForSaveReturn = {
  meetingStartDate: string;
  meetingEndDate: string;
  meetingDetails?: string;
  location?: string;
  additionalDetails?: string;
};

const FORM_DATA_TO_COHORT_DATA_KEY_MAPPING = {
  [FORM_INPUTS.START_DATE]: 'meetingStartDate',
  [FORM_INPUTS.END_DATE]: 'meetingEndDate',
  [FORM_INPUTS.DATE_DETAILS]: 'dateDetails',
  [FORM_INPUTS.MEETING_DETAILS]: 'meetingDetails',
  [FORM_INPUTS.MEETING_LOCATION]: 'location'
};

const FORMATTERS: Record<FORM_INPUTS, (v: string) => Date | string> = {
  [FORM_INPUTS.START_DATE]: formatAsDate,
  [FORM_INPUTS.END_DATE]: formatAsDate,
  [FORM_INPUTS.DATE_DETAILS]: (value: string) => value,
  [FORM_INPUTS.MEETING_DETAILS]: (value: string) => value,
  [FORM_INPUTS.MEETING_LOCATION]: (value: string) => value
};

export const formatFormInputsForSave = ({
  formData
}: FormatFormDataForSave): FormatFormDataForSaveReturn => {
  return Object.values(FORM_INPUTS).reduce(
    (acc, FORM_DATA_KEY) => {
      const formattedValue = FORMATTERS[FORM_DATA_KEY](formData[FORM_DATA_KEY]);

      return {
        ...acc,
        [FORM_DATA_TO_COHORT_DATA_KEY_MAPPING[FORM_DATA_KEY]]: formattedValue
      };
    },
    {
      meetingStartDate: null,
      meetingEndDate: null
    }
  );
};
