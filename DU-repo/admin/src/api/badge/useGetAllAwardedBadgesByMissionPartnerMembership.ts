import { gql, useQuery } from '@apollo/client';
import type {
  GetAllAwardedBadgesByMissionPartnerMembershipQuery,
  GetAllAwardedBadgesByMissionPartnerMembershipQueryVariables
} from '@/api/codegen/graphql';

export const useGetAllAwardedBadgesByMissionPartnerMembership = (
  missionPartnerId: string
) => {
  const query = gql`
    query GetAllAwardedBadgesByMissionPartnerMembership(
      $missionPartnerId: ID!
    ) {
      getAllAwardedBadgesByMissionPartnerMembership(
        missionPartnerId: $missionPartnerId
      ) {
        id: badgeId
        imageUrl: badgeImage
        title: badgeTitle
        missionPartnerId
        missionPartnerCount: missionPartnerMembersAwarded
      }
    }
  `;
  const { loading, error, data } = useQuery<
    GetAllAwardedBadgesByMissionPartnerMembershipQuery,
    GetAllAwardedBadgesByMissionPartnerMembershipQueryVariables
  >(query, {
    variables: {
      missionPartnerId
    }
  });
  return {
    getAllAwardedBadgesByMissionPartnerMembershipLoading: loading,
    getAllAwardedBadgesByMissionPartnerMembershipError: error,
    getAllAwardedBadgesByMissionPartnerMembershipData:
      data?.getAllAwardedBadgesByMissionPartnerMembership || null
  };
};
