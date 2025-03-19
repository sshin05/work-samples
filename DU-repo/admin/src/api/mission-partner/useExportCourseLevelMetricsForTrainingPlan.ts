import { gql, useLazyQuery } from '@apollo/client';
import type {
  ExportCourseLevelMetricsForTrainingPlanQuery,
  ExportCourseLevelMetricsForTrainingPlanQueryVariables
} from '@/api/codegen/graphql';

/*
  This method now handles exporting course level metrics for a training plan within a MP or a Cohort.
  The only difference is whether a groupId is provided which is why that argument is now optional.
*/
export const useExportCourseLevelMetricsForTrainingPlan = () => {
  const query = gql`
    query ExportCourseLevelMetricsForTrainingPlan(
      $missionPartnerId: ID!
      $groupId: ID
      $planSourceId: ID!
      $planVersion: String
      $title: String
    ) {
      exportCourseLevelMetricsForTrainingPlan(
        missionPartnerId: $missionPartnerId
        groupId: $groupId
        planSourceId: $planSourceId
        planVersion: $planVersion
        title: $title
      ) {
        id
      }
    }
  `;
  const [exportCourseLevelMetricsForTrainingPlan, { loading, error, data }] =
    useLazyQuery<
      ExportCourseLevelMetricsForTrainingPlanQuery,
      ExportCourseLevelMetricsForTrainingPlanQueryVariables
    >(query, {
      fetchPolicy: 'network-only'
    });
  return {
    exportCourseLevelMetricsForTrainingPlan,
    exportCourseLevelMetricsForTrainingPlanLoading: loading,
    exportCourseLevelMetricsForTrainingPlanError: error,
    exportCourseLevelMetricsForTrainingPlanData:
      data?.exportCourseLevelMetricsForTrainingPlan || null
  };
};
