import { gql, useQuery } from '@apollo/client';
import type {
  FindUserMissionPartnerMembershipsQuery,
  FindUserMissionPartnerMembershipsQueryVariables
} from '@/api/codegen/graphql';

const STATIC_ARRAY = [];

export const useFindUserMissionPartnerMemberships = () => {
  const query = gql`
    query FindUserMissionPartnerMemberships {
      findUserMissionPartnerMemberships {
        userId
        missionPartnerId
        email
        firstName
        lastName
        missionPartnerName
        logoUrl
        affiliateId
        description
        createdAt
        trialEnabled
        trialStartDate
        trialEndDate
        featuredTraining {
          type
          courseId
          assessmentId
          labId
          planType
          planSourceId
          planVersion
          title
          dateAdded
          required
        }
      }
    }
  `;
  const { refetch, loading, error, data } = useQuery<
    FindUserMissionPartnerMembershipsQuery,
    FindUserMissionPartnerMembershipsQueryVariables
  >(query);
  return {
    userMissionPartnersLoading: loading,
    userMissionPartnersError: error,
    userMissionPartners: (data?.findUserMissionPartnerMemberships ||
      STATIC_ARRAY) as FindUserMissionPartnerMembershipsQuery['findUserMissionPartnerMemberships'],
    refetchMissionPartners: refetch
  };
};
