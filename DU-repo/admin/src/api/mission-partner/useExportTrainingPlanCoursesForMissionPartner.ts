import { gql, useLazyQuery } from '@apollo/client';
import type {
  ExportTrainingPlanCoursesForMissionPartnerQuery,
  ExportTrainingPlanCoursesForMissionPartnerQueryVariables
} from '@/api/codegen/graphql';

export const useExportTrainingPlanCoursesForMissionPartner = () => {
  const query = gql`
    query ExportTrainingPlanCoursesForMissionPartner(
      $missionPartnerId: ID!
      $missionPartnerName: String!
      $vendorName: String
      $status: String
    ) {
      exportTrainingPlanCoursesForMissionPartner(
        missionPartnerId: $missionPartnerId
        missionPartnerName: $missionPartnerName
        vendorName: $vendorName
        status: $status
      ) {
        id
      }
    }
  `;
  const [exportTrainingPlanCoursesForMissionPartner, { loading, error, data }] =
    useLazyQuery<
      ExportTrainingPlanCoursesForMissionPartnerQuery,
      ExportTrainingPlanCoursesForMissionPartnerQueryVariables
    >(query, {
      fetchPolicy: 'network-only'
    });
  return {
    exportTrainingPlanCoursesForMissionPartner,
    exportTrainingPlanCoursesForMissionPartnerLoading: loading,
    exportTrainingPlanCoursesForMissionPartnerError: error,
    exportTrainingPlanCoursesForMissionPartnerData:
      data?.exportTrainingPlanCoursesForMissionPartner || null
  };
};
