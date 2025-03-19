import {
  isPlan,
  mapToPlanType,
  type CartItem,
  type CollectionItem
} from './CartItemTypes';

export const mapCartToCollection = ({
  __typename,
  id,
  version,
  courseTitle,
  title,
  assessmentTitle,
  courseDescription,
  assessmentDescription,
  content,
  vendors,
  vendorName
}: CartItem): CollectionItem => ({
  type: {
    Course: 'COURSE',
    Assessment: 'ASSESSMENT',
    ForceMultiplier: 'TRAINING_PLAN',
    Skill: 'TRAINING_PLAN',
    LearningPath: 'TRAINING_PLAN',
    Lab: 'LAB'
  }[__typename],
  courseId: __typename === 'Course' ? id : undefined,
  assessmentId: __typename === 'Assessment' ? id : undefined,
  planType: mapToPlanType(__typename),
  planSourceId: isPlan ? id : undefined,
  planVersion: isPlan ? version : undefined,
  title: courseTitle || title || assessmentTitle,
  description: courseDescription || assessmentDescription || content?.summary,
  vendors: vendors || [vendorName],
  dateAdded: new Date().toISOString()
});
