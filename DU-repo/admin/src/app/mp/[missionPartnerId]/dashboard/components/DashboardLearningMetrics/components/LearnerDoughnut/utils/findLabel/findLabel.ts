import { formatAsPercentage } from '@/app/mp/[missionPartnerId]/utils/formatAsPercentage';
import { pluralSCheck } from '@/app/mp/[missionPartnerId]/utils/pluralSCheck';

export const findLabel = (
  index: number,
  totalLearners: number,
  activeLearners: number,
  onboardedLearners: number,
  notOnboardedLearners: number
) => {
  switch (index) {
    case 0: {
      const activePercentage = formatAsPercentage(
        activeLearners / (totalLearners || 1)
      );

      return `${activeLearners} Learner${pluralSCheck(
        activeLearners
      )} Onboarded and Active (${activePercentage})`;
    }

    case 1: {
      const onboardedPercentage = formatAsPercentage(
        onboardedLearners / (totalLearners || 1)
      );

      return `${onboardedLearners} Learner${pluralSCheck(
        onboardedLearners
      )} Onboarded but Inactive (${onboardedPercentage})`;
    }

    case 2: {
      const notOnboardedPercentage = formatAsPercentage(
        notOnboardedLearners / (totalLearners || 1)
      );

      return `${notOnboardedLearners} Learner${pluralSCheck(
        notOnboardedLearners
      )} not Onboarded (${notOnboardedPercentage})`;
    }

    default:
      return '';
  }
};
