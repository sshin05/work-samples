import { gql, useQuery } from '@apollo/client';
import type {
  GetPlansQuarterlyByMissionPartnerQuery,
  GetPlansQuarterlyByMissionPartnerQueryVariables
} from '@/api/codegen/graphql';

const STATIC_ARRAY = [];

export const useGetPlansQuarterlyByMissionPartner = (
  missionPartnerId: string
) => {
  const query = gql`
    query GetPlansQuarterlyByMissionPartner(
      $missionPartnerId: ID!
      $maxNumberofQuarters: SafeInt
    ) {
      getPlansQuarterlyByMissionPartner(
        missionPartnerId: $missionPartnerId
        maxNumberofQuarters: $maxNumberofQuarters
      ) {
        quarter
        assigned {
          numberOfUsers
          percentageOfUsers
        }
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
    GetPlansQuarterlyByMissionPartnerQuery,
    GetPlansQuarterlyByMissionPartnerQueryVariables
  >(query, {
    variables: {
      missionPartnerId,
      maxNumberofQuarters: 6
    }
  });
  return {
    getPlansQuarterlyByMissionPartnerLoading: loading,
    getPlansQuarterlyByMissionPartnerError: error,
    getPlansQuarterlyByMissionPartner:
      (data?.getPlansQuarterlyByMissionPartner ||
        STATIC_ARRAY) as GetPlansQuarterlyByMissionPartnerQuery['getPlansQuarterlyByMissionPartner']
  };
};
