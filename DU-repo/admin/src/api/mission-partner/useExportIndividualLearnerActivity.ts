import { gql, useLazyQuery } from '@apollo/client';
import {
  type ExportIndividualLearnerActivityQuery,
  type ExportIndividualLearnerActivityQueryVariables
} from '@/api/codegen/graphql';

export const useExportIndividualLearnerActivity = () => {
  const query = gql`
    query ExportIndividualLearnerActivity(
      $missionPartnerId: ID!
      $userId: ID!
    ) {
      exportIndividualLearnerActivity(
        missionPartnerId: $missionPartnerId
        userId: $userId
      ) {
        id
        userId
        type
        requestedAt
        completedAt
        title
        parameters
        status
        error
      }
    }
  `;
  const [exportIndividualLearnerActivity, { loading, error, data }] =
    useLazyQuery<
      ExportIndividualLearnerActivityQuery,
      ExportIndividualLearnerActivityQueryVariables
    >(query);
  return {
    exportIndividualLearnerActivity,
    exportIndividualLearnerActivityLoading: loading,
    exportIndividualLearnerActivityError: error,
    exportIndividualLearnerActivityData: data?.exportIndividualLearnerActivity
  };
};
