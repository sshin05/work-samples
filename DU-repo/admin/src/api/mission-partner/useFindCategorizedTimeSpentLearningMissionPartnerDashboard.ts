import { gql, useQuery } from '@apollo/client';
import type {
  FindCategorizedTimeSpentLearningQuery,
  FindCategorizedTimeSpentLearningQueryVariables
} from '@/api/codegen/graphql';

export const useFindCategorizedTimeSpentLearningMissionPartnerDashboard = (
  missionPartnerId: string
) => {
  const query = gql`
    query FindCategorizedTimeSpentLearning(
      $missionPartnerId: ID!
      $categoryPercentileBreakpoints: [Int]
      $roundToHour: Boolean
    ) {
      findCategorizedTimeSpentLearning(
        missionPartnerId: $missionPartnerId
        categoryPercentileBreakpoints: $categoryPercentileBreakpoints
        roundToHour: $roundToHour
      ) {
        categoryBreakpoints
        usersPerCategory
      }
    }
  `;
  const { loading, error, data } = useQuery<
    FindCategorizedTimeSpentLearningQuery,
    FindCategorizedTimeSpentLearningQueryVariables
  >(query, {
    variables: {
      missionPartnerId,
      categoryPercentileBreakpoints: [5, 25, 50, 75, 95],
      roundToHour: true
    }
  });
  return {
    findCategorizedTimeSpentLearningLoading: loading,
    findCategorizedTimeSpentLearningError: error,
    findCategorizedTimeSpentLearning:
      data?.findCategorizedTimeSpentLearning || null
  };
};
