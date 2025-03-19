import { gql, useLazyQuery } from '@apollo/client';
import type {
  ExportQuizExamsQuery,
  ExportQuizExamsQueryVariables
} from '@/api/codegen/graphql';

export const useExportQuizExams = () => {
  const query = gql`
    query ExportQuizExams(
      $missionPartnerId: ID!
      $missionPartnerName: String!
      $quizOrExamId: String!
      $quizOrExamName: String!
    ) {
      exportQuizExams(
        missionPartnerId: $missionPartnerId
        missionPartnerName: $missionPartnerName
        quizOrExamId: $quizOrExamId
        quizOrExamName: $quizOrExamName
      ) {
        id
      }
    }
  `;
  const [exportQuizExams, { loading, error, data }] = useLazyQuery<
    ExportQuizExamsQuery,
    ExportQuizExamsQueryVariables
  >(query, {
    fetchPolicy: 'network-only'
  });
  return {
    exportQuizExams,
    exportQuizExamsLoading: loading,
    exportQuizExamsError: error,
    exportQuizExamsData: data?.exportQuizExams || null
  };
};
