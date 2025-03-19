import { gql, useQuery } from '@apollo/client';
import type {
  LearnerTrainingPlanQuery,
  LearnerTrainingPlanQueryVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useGetLearnerTrainingPlans = (userId: string) => {
  const LEARNER_TRAINING_PLAN = gql`
    query LearnerTrainingPlan($userId: ID!) {
      getTrainingPlansByUserId(userId: $userId) {
        id
        userId
        planType
        planSourceId
        title
        assignedAt
        startedAt
        completedAt
        stoppedAt
      }
    }
  `;
  const { loading, error, data, refetch } = useQuery<
    LearnerTrainingPlanQuery,
    LearnerTrainingPlanQueryVariables
  >(LEARNER_TRAINING_PLAN, {
    variables: {
      userId
    },
    skip: !userId
  });
  return useMemo(
    () => ({
      learnerTrainingPlansLoading: loading,
      learnerTrainingPlansError: error,
      learnerTrainingPlans: (data?.getTrainingPlansByUserId ||
        null) as LearnerTrainingPlanQuery['getTrainingPlansByUserId'],
      refetchLearnerTrainingPlans: refetch
    }),
    [loading, error, data, refetch]
  );
};
