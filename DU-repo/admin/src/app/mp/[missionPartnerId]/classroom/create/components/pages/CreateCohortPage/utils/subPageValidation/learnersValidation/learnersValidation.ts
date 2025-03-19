import { CreateCohortStateInputValidationErrors } from '@/app/mp/[missionPartnerId]/classroom/create/providers/CreateCohortProvider/CreateCohortProvider.types';
import type { ValidateInputForStepArguments } from '../../../CreateCohortPage.types';

export const learnersValidation = async ({
  createCohortState
}: ValidateInputForStepArguments) => {
  const hasLearners = createCohortState?.learners?.length > 0;
  if (!hasLearners) {
    return {
      success: false,
      error: CreateCohortStateInputValidationErrors.MISSING_LEARNERS
    };
  }

  return {
    success: true
  };
};
