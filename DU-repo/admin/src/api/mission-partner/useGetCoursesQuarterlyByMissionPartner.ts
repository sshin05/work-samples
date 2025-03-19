import { gql, useQuery } from '@apollo/client';
import type {
  GetCoursesQuarterlyByMissionPartnerQuery,
  GetCoursesQuarterlyByMissionPartnerQueryVariables
} from '@/api/codegen/graphql';

const STATIC_ARRAY = [];

export const useGetCoursesQuarterlyByMissionPartner = (
  missionPartnerId: string
) => {
  const query = gql`
    query GetCoursesQuarterlyByMissionPartner(
      $missionPartnerId: ID!
      $maxNumberofQuarters: SafeInt
    ) {
      getCoursesQuarterlyByMissionPartner(
        missionPartnerId: $missionPartnerId
        maxNumberofQuarters: $maxNumberofQuarters
      ) {
        quarter
        started {
          numberOfUsers
          percentageOfUsers
        }
        stopped {
          numberOfUsers
          percentageOfUsers
        }
        completed {
          numberOfUsers
          percentageOfUsers
        }
        total
      }
    }
  `;
  const { loading, error, data } = useQuery<
    GetCoursesQuarterlyByMissionPartnerQuery,
    GetCoursesQuarterlyByMissionPartnerQueryVariables
  >(query, {
    variables: {
      missionPartnerId,
      maxNumberofQuarters: 6
    }
  });
  return {
    getCoursesQuarterlyByMissionPartnerLoading: loading,
    getCoursesQuarterlyByMissionPartnerError: error,
    getCoursesQuarterlyByMissionPartner:
      (data?.getCoursesQuarterlyByMissionPartner ||
        STATIC_ARRAY) as GetCoursesQuarterlyByMissionPartnerQuery['getCoursesQuarterlyByMissionPartner']
  };
};
