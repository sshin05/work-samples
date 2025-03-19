import { gql, useQuery } from '@apollo/client';

export const useAggregateTranscriptTrainingPlans = (
  variables // : AggregateTranscriptTrainingPlansQueryVariables
) => {
  const query = gql`
    query AggregateTranscriptTrainingPlans(
      $missionPartnerId: String!
      $planType: String
      $search: String
      $sortField: String
      $sortDirection: String
      $pageSize: SafeInt
      $pageNumber: SafeInt
    ) {
      aggregateTranscriptTrainingPlans(
        missionPartnerId: $missionPartnerId
        planType: $planType
        search: $search
        sortField: $sortField
        sortDirection: $sortDirection
        pageSize: $pageSize
        pageNumber: $pageNumber
      ) {
        records {
          planType
          planSourceId
          planTitle
          total
          assigned
          started
          stopped
          completed
        }
        total
      }
    }
  `;
  const { loading, error, data } = useQuery(query, {
    variables,
    fetchPolicy: 'no-cache'
  });

  return {
    transcriptTrainingPlansLoading: loading,
    transcriptTrainingPlansError: error,
    transcriptTrainingPlans: data?.aggregateTranscriptTrainingPlans.records,
    transcriptTrainingPlansTotal:
      data?.aggregateTranscriptTrainingPlans?.total || 0
  };
};
