import { gql, useLazyQuery } from '@apollo/client';
import type {
  ExportTrainingPlanTranscriptsForMissionPartnerQuery,
  ExportTrainingPlanTranscriptsForMissionPartnerQueryVariables
} from '@/api/codegen/graphql';

export const useExportTrainingPlanTranscriptsForMissionPartner = () => {
  const query = gql`
    query ExportTrainingPlanTranscriptsForMissionPartner(
      $missionPartnerId: ID!
      $missionPartnerName: String
    ) {
      exportTrainingPlanTranscriptsForMissionPartner(
        missionPartnerId: $missionPartnerId
        missionPartnerName: $missionPartnerName
      ) {
        id
      }
    }
  `;
  const [
    exportTrainingPlanTranscriptsForMissionPartner,
    { loading, error, data }
  ] = useLazyQuery<
    ExportTrainingPlanTranscriptsForMissionPartnerQuery,
    ExportTrainingPlanTranscriptsForMissionPartnerQueryVariables
  >(query, {
    fetchPolicy: 'network-only'
  });
  return {
    exportTrainingPlanTranscriptsForMissionPartner,
    exportTrainingPlanTranscriptsForMissionPartnerLoading: loading,
    exportTrainingPlanTranscriptsForMissionPartnerError: error,
    exportTrainingPlanTranscriptsForMissionPartnerData:
      data?.exportTrainingPlanTranscriptsForMissionPartner || null
  };
};
