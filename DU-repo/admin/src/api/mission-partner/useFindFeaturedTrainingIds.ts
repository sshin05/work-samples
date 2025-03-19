import { gql, useQuery } from '@apollo/client';
import type {
  FindMissionPartnerByIdQuery,
  FindMissionPartnerByIdQueryVariables
} from '@/api/codegen/graphql';
import { map } from 'lodash';

const STATIC_ARRAY = [];

export const useFindFeaturedTrainingIds = (missionPartnerId: string) => {
  const query = gql`
    query FindFeaturedTrainingIds($id: ID!) {
      findMissionPartnerById(id: $id) {
        id
        featuredTraining {
          type
          courseId
          assessmentId
          labId
          planSourceId
        }
      }
    }
  `;
  const { loading, error, data } = useQuery<
    FindMissionPartnerByIdQuery,
    FindMissionPartnerByIdQueryVariables
  >(query, {
    variables: {
      id: missionPartnerId
    },
    skip: !missionPartnerId
  });
  const featuredTrainingIds = map(
    data?.findMissionPartnerById?.featuredTraining,
    item => {
      switch (item.type) {
        case 'COURSE':
          return item.courseId;
        case 'ASSESSMENT':
          return item.assessmentId;
        case 'TRAINING_PLAN':
          return item.planSourceId;
        case 'LAB':
          return item.labId;
        default:
          return undefined;
      }
    }
  );
  return {
    featuredTrainingIdsLoading: loading,
    featuredTrainingIdsError: error,
    featuredTrainingIds: featuredTrainingIds || STATIC_ARRAY
  };
};
