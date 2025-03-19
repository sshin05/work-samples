import { gql, useLazyQuery } from '@apollo/client';
import type {
  GetTrainingPlanProgressQuery,
  GetTrainingPlanProgressQueryVariables
} from '@/api/codegen/graphql';

const STATIC_ARRAY: never[] = [];

export const useGetTrainingPlanProgress = (
  options?: GetTrainingPlanProgressQueryVariables
) => {
  const query = gql`
    fragment coreTrainingPlanProgress on TrainingPlanProgress {
      id
      title
      type
      source
      notStarted
      inProgress
      pendingReview
      completed
      __typename
    }
    query GetTrainingPlanProgress(
      $groupId: ID!
      $planSourceId: ID!
      $planType: String!
      $planVersion: String!
    ) {
      getTrainingPlanProgress(
        groupId: $groupId
        planSourceId: $planSourceId
        planType: $planType
        planVersion: $planVersion
      ) {
        ...coreTrainingPlanProgress
        items {
          id
          title
          type
          source
          notStarted
          inProgress
          pendingReview
          completed
          __typename
        }
      }
    }
  `;
  const [refetch, { loading, error, data }] = useLazyQuery<
    GetTrainingPlanProgressQuery,
    GetTrainingPlanProgressQueryVariables
  >(query, {
    fetchPolicy: 'network-only',
    ...options
  });
  return {
    trainingPlanProgressLoading: loading,
    trainingPlanProgressError: error,
    trainingPlanProgress: data?.getTrainingPlanProgress || STATIC_ARRAY,
    fetchTrainingPlanProgress: refetch
  };
};
