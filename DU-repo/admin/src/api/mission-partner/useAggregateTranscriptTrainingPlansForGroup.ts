import { gql, useQuery } from '@apollo/client';
import type {
  AggregateTranscriptTrainingPlansForGroupQuery,
  AggregateTranscriptTrainingPlansForGroupQueryVariables
} from '@/api/codegen/graphql';

const STATIC_ARRAY = [];

export const useAggregateTranscriptTrainingPlansForGroup = (
  variables: AggregateTranscriptTrainingPlansForGroupQueryVariables
) => {
  const query = gql`
    query AggregateTranscriptTrainingPlansForGroup(
      $missionPartnerId: String!
      $groupId: String!
    ) {
      aggregateTranscriptTrainingPlansForGroup(
        missionPartnerId: $missionPartnerId
        groupId: $groupId
      ) {
        planType
        planSourceId
        planTitle
        total
        assigned
        started
        stopped
        completed
      }
    }
  `;
  const { loading, error, data, refetch } = useQuery<
    AggregateTranscriptTrainingPlansForGroupQuery,
    AggregateTranscriptTrainingPlansForGroupQueryVariables
  >(query, {
    variables,
    fetchPolicy: 'cache-and-network'
  });
  return {
    transcriptTrainingPlansLoading: loading,
    transcriptTrainingPlansError: error,
    transcriptTrainingPlans: (data?.aggregateTranscriptTrainingPlansForGroup ||
      STATIC_ARRAY) as AggregateTranscriptTrainingPlansForGroupQuery['aggregateTranscriptTrainingPlansForGroup'],
    refetchTranscriptTrainingPlans: refetch
  };
};
