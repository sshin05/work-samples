import dayjs from 'dayjs';
import { CreateCohortStateInputValidationErrors } from '../../../../../../providers/CreateCohortProvider/CreateCohortProvider.types';
import type { ValidateInputForStepArguments } from '../../../CreateCohortPage.types';

/** Validates the required fields have been completed and have valid inputs
 * before allowing the user to proceed to the next setup step */
export const reportingInstructionsValidation = async ({
  createCohortState
}: ValidateInputForStepArguments) => {
  const isMissingStartDate = !createCohortState?.meetingStartDate;
  const isMissingEndDate = !createCohortState?.meetingEndDate;

  const now = dayjs();
  const startDate = dayjs(createCohortState?.meetingStartDate);
  const endDate = dayjs(createCohortState?.meetingEndDate);
  const isInvalidStartDate = startDate.isBefore(now);
  const isInvalidEndDate = endDate.isBefore(startDate);

  if (isMissingStartDate || isInvalidStartDate) {
    return {
      success: false,
      error: CreateCohortStateInputValidationErrors.INVALID_MEETING_START_DATE
    };
  }

  if (isMissingEndDate || isInvalidEndDate) {
    return {
      success: false,
      error: CreateCohortStateInputValidationErrors.INVALID_MEETING_END_DATE
    };
  }

  if (
    createCohortState?.environment === 'InPerson' &&
    !createCohortState?.location
  ) {
    return {
      success: false,
      error: CreateCohortStateInputValidationErrors.MISSING_LOCATION
    };
  }

  return {
    success: true
  };
};
