import { gql, useQuery } from '@apollo/client';
import type {
  GetLearningObjectiveQuery,
  GetLearningObjectiveQueryVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useGetLearningObjective = ({
  getLearningObjectiveId
}: GetLearningObjectiveQueryVariables) => {
  const query = gql`
    query GetLearningObjective($getLearningObjectiveId: ID!) {
      getLearningObjective(id: $getLearningObjectiveId) {
        id
        description
      }
    }
  `;

  const { data, loading, error } = useQuery<
    GetLearningObjectiveQuery,
    GetLearningObjectiveQueryVariables
  >(query, {
    variables: {
      getLearningObjectiveId
    }
  });

  return useMemo(
    () => ({
      learningObjective: data?.getLearningObjective || [],
      learningObjectiveLoading: loading,
      learningObjectiveError: error
    }),
    [data, loading, error]
  );
};
