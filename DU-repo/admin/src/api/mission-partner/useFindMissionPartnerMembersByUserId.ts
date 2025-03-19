import { gql, useQuery } from '@apollo/client';
import type {
  FindMissionPartnerMembersByUserIdQuery,
  FindMissionPartnerMembersByUserIdQueryVariables
} from '@/api/codegen/graphql';

const STATIC_ARRAY = [];

export const useFindMissionPartnerMembersByUserId = (userId?: string) => {
  const query = gql`
    query findMissionPartnerMembersByUserId($userId: ID!) {
      findMissionPartnerMembersByUserId(userId: $userId) {
        missionPartnerId
        missionPartnerName
        createdAt
      }
    }
  `;
  const { loading, error, data } = useQuery<
    FindMissionPartnerMembersByUserIdQuery,
    FindMissionPartnerMembersByUserIdQueryVariables
  >(query, {
    variables: {
      userId
    },
    skip: !userId
  });
  return {
    userMissonPartners: (data?.findMissionPartnerMembersByUserId ||
      STATIC_ARRAY) as FindMissionPartnerMembersByUserIdQuery['findMissionPartnerMembersByUserId'],
    userMissonPartnersLoading: loading,
    userMissonPartnersError: error
  };
};
