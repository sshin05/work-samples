import { gql, useQuery } from '@apollo/client';
import type {
  GetMissionPartnerOwnedBadgesQuery,
  GetMissionPartnerOwnedBadgesQueryVariables
} from '@/api/codegen/graphql';

export const useGetMissionPartnerOwnedBadges = (missionPartnerId: string) => {
  const query = gql`
    query GetMissionPartnerOwnedBadges($missionPartnerId: ID!) {
      getMissionPartnerOwnedBadges(missionPartnerId: $missionPartnerId) {
        id: badgeId
        imageUrl: badgeImage
        title: badgeTitle
        missionPartnerId
        count: totalAwarded
        missionPartnerCount: missionPartnerMembersAwarded
      }
    }
  `;
  const { loading, error, data } = useQuery<
    GetMissionPartnerOwnedBadgesQuery,
    GetMissionPartnerOwnedBadgesQueryVariables
  >(query, {
    variables: {
      missionPartnerId
    }
  });
  return {
    getMissionPartnerOwnedBadgesLoading: loading,
    getMissionPartnerOwnedBadgesError: error,
    getMissionPartnerOwnedBadgesData: data?.getMissionPartnerOwnedBadges || null
  };
};
