import { gql, useLazyQuery } from '@apollo/client';
import type {
  ExportTrainingPlanTranscriptsForGroupQuery,
  ExportTrainingPlanTranscriptsForGroupQueryVariables
} from '@/api/codegen/graphql';

export const useExportTrainingPlanTranscriptsForGroup = () => {
  const query = gql`
    query ExportTrainingPlanTranscriptsForGroup(
      $missionPartnerId: ID!
      $groupId: ID!
      $groupName: String
    ) {
      exportTrainingPlanTranscriptsForGroup(
        missionPartnerId: $missionPartnerId
        groupId: $groupId
        groupName: $groupName
      ) {
        id
      }
    }
  `;
  const [exportTrainingPlanTranscriptsForGroup, { loading, error, data }] =
    useLazyQuery<
      ExportTrainingPlanTranscriptsForGroupQuery,
      ExportTrainingPlanTranscriptsForGroupQueryVariables
    >(query, {
      fetchPolicy: 'network-only'
    });
  return {
    exportTrainingPlanTranscriptsForGroup,
    exportTrainingPlanTranscriptsForGroupLoading: loading,
    exportTrainingPlanTranscriptsForGroupError: error,
    exportTrainingPlanTranscriptsForGroupData:
      data?.exportTrainingPlanTranscriptsForGroup || null
  };
};
