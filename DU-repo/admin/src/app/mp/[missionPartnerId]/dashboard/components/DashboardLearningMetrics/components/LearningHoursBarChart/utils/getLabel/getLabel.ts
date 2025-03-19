import { pluralSCheck } from '@/app/mp/[missionPartnerId]/utils/pluralSCheck';

export const getLabel = (
  index: number,
  reverseCategoryHours: number[],
  reverseLearnersPerCategory: number[]
) => {
  let timeRange = '';
  switch (index) {
    case 0:
      timeRange = `${reverseCategoryHours[0]}+`;
      break;
    case 1:
    case 2:
    case 3:
    case 4:
      timeRange = `${reverseCategoryHours[index]}-${
        reverseCategoryHours[index - 1]
      }`;
      break;
    case 5:
      timeRange = `0-${reverseCategoryHours[4]}`;
      break;
    case 6:
      timeRange = '0';
      break;
    default:
      break;
  }

  return `${reverseLearnersPerCategory[index]} Learner${pluralSCheck(
    reverseLearnersPerCategory[index]
  )} with ${timeRange} hours`;
};
