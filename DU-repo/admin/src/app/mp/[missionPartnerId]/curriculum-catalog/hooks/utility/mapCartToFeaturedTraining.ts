import {
  isPlan,
  mapToPlanType,
  type CartItem,
  type FeaturedTrainingItem
} from './CartItemTypes';

export const mapCartToFeaturedTraining = ({
  __typename,
  id,
  version,
  courseTitle,
  title,
  assessmentTitle,
  name,
  courseDescription,
  assessmentDescription,
  content,
  description,
  vendors,
  vendorName,
  missionPartner
}: CartItem): FeaturedTrainingItem => {
  const isCourse = __typename === 'Course';
  const isAssessment = __typename === 'Assessment';
  const isLab = __typename === 'Lab';

  return {
    type: mapToTrainingType(__typename),
    courseId: isCourse ? id : undefined,
    assessmentId: isAssessment ? id : undefined,
    labId: isLab ? id : undefined,
    planType: mapToPlanType(__typename),
    planSourceId: isPlan ? id : undefined,
    planVersion: isPlan ? version : undefined,
    title: isLab ? name : courseTitle || title || assessmentTitle || name,
    description:
      courseDescription ||
      assessmentDescription ||
      content?.summary ||
      description,
    vendors: isLab ? [missionPartner?.name] : vendors || [vendorName],
    dateAdded: new Date().toISOString(),
    required: false
  };
};

const mapToTrainingType = typename => {
  return typename === 'Course'
    ? 'COURSE'
    : typename === 'Assessment'
      ? 'ASSESSMENT'
      : typename === 'ForceMultiplier' ||
          typename === 'Skill' ||
          typename === 'LearningPath'
        ? 'TRAINING_PLAN'
        : typename === 'Lab'
          ? 'LAB'
          : undefined;
};
