import { gql, useLazyQuery } from '@apollo/client';
import type {
  ExportSurveysQuery,
  ExportSurveysQueryVariables
} from '@/api/codegen/graphql';

export const useExportSurveys = () => {
  const query = gql`
    query ExportSurveys(
      $missionPartnerId: ID!
      $missionPartnerName: String!
      $surveyId: String!
      $surveyName: String!
    ) {
      exportSurveys(
        missionPartnerId: $missionPartnerId
        missionPartnerName: $missionPartnerName
        surveyId: $surveyId
        surveyName: $surveyName
      ) {
        id
      }
    }
  `;
  const [exportSurveys, { loading, error, data }] = useLazyQuery<
    ExportSurveysQuery,
    ExportSurveysQueryVariables
  >(query, {
    fetchPolicy: 'network-only'
  });
  return {
    exportSurveys,
    exportSurveysLoading: loading,
    exportSurveysError: error,
    exportSurveysData: data?.exportSurveys || null
  };
};
