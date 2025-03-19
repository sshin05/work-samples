// TODO: acquire from graphql?
export type CartItem = {
  __typename: string;
  id: string;
  version: string;
  title: string;
  courseTitle: string;
  assessmentTitle: string;
  name: string;
  description: string;
  content: {
    summary: string;
  };
  courseDescription: string;
  assessmentDescription: string;
  vendorName: string;
  vendors: string[];
  missionPartner: {
    name: string;
  };
  launchConfig: {
    type: string;
    path: string;
  };
};

export type CollectionItem = {
  type: string;
  courseId: string;
  assessmentId: string;
  planType: string;
  planSourceId: string;
  planVersion: string;
  title: string;
  description: string;
  vendors: string[];
  dateAdded: string;
};

export type FeaturedTrainingItem = {
  type: string;
  courseId: string;
  assessmentId: string;
  labId: string;
  planType: string;
  planSourceId: string;
  planVersion: string;
  title: string;
  description: string;
  vendors: string[];
  dateAdded: string;
  required: boolean;
};

export const isPlan = (typename: string) =>
  ['LearningPath', 'Skill', 'ForceMultiplier'].includes(typename);

export const mapToPlanType = typename => {
  return typename === 'LearningPath'
    ? 'Learning Path'
    : typename === 'Skill'
      ? 'Skill'
      : typename === 'ForceMultiplier'
        ? 'Force Multiplier'
        : undefined;
};
