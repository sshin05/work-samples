import type { IsSetupStepCompleteCohortData } from '../../../CreateCohortPage.types';

export const isLearnersComplete = (
  cohortData: IsSetupStepCompleteCohortData
) => {
  return cohortData?.cohortMembers?.length > 0;
};
