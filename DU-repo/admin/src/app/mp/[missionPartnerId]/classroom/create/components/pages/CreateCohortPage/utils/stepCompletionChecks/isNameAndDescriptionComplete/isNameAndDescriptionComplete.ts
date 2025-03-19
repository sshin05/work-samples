import type { IsSetupStepCompleteCohortData } from '../../../CreateCohortPage.types';

export const isNameAndDescriptionComplete = ({
  cohort
}: IsSetupStepCompleteCohortData) => {
  return Boolean(cohort?.name);
};
