import { gql, useQuery } from '@apollo/client';
import type {
  GetUserMissionPartnerTrialStatusQuery,
  GetUserMissionPartnerTrialStatusQueryVariables
} from '@/api/codegen/graphql';

export const useGetUserMissionPartnerTrialStatus = () => {
  const query = gql`
    query GetUserMissionPartnerTrialStatus {
      getUserMissionPartnerTrialStatus {
        hasExpiredTrial
        missionPartner {
          id
          name
          trialStartDate
          trialEndDate
          trialEnabled
        }
      }
    }
  `;
  const { loading, error, data } = useQuery<
    GetUserMissionPartnerTrialStatusQuery,
    GetUserMissionPartnerTrialStatusQueryVariables
  >(query);
  return {
    userMissionPartnerTrialStatusLoading: loading,
    userMissionPartnerTrialStatusError: error,
    userMissionPartnerTrialStatus: data?.getUserMissionPartnerTrialStatus
  };
};
