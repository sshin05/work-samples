import type { IsSetupStepCompleteCohortData } from '../../../CreateCohortPage.types';

export const isReportingInstructionsComplete = ({
  cohort
}: IsSetupStepCompleteCohortData) => {
  const isDatesCompleted = Boolean(
    cohort?.meetingEndDate && cohort?.meetingStartDate
  );
  const isLocationCompleted =
    cohort?.environment !== 'InPerson' || Boolean(cohort?.location);

  return isDatesCompleted && isLocationCompleted;
};
