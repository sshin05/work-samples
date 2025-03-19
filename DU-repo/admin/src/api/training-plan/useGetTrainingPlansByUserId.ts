import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import type {
  GetTrainingPlansByUserIdQuery,
  GetTrainingPlansByUserIdQueryVariables
} from '@/api/codegen/graphql';
import { GET_TRAINING_PLANS_BY_USER_ID_QUERY } from './queries/GET_TRAINING_PLANS_BY_USER_ID_QUERY';

export const useGetTrainingPlansByUserId = (userId: string) => {
  const { loading, error, data, refetch } = useQuery<
    GetTrainingPlansByUserIdQuery,
    GetTrainingPlansByUserIdQueryVariables
  >(GET_TRAINING_PLANS_BY_USER_ID_QUERY, {
    variables: {
      userId
    },
    skip: !userId
  });
  return useMemo(
    () => ({
      trainingPlanByIdLoading: loading,
      trainingPlanByIdError: error,
      trainingPlanById: (data?.getTrainingPlansByUserId ||
        null) as GetTrainingPlansByUserIdQuery['getTrainingPlansByUserId'],
      refetchTrainingPlanById: refetch
    }),
    [loading, error, data, refetch]
  );
};
