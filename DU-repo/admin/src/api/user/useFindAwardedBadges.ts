import { gql, useQuery } from '@apollo/client';
import type {
  FindAwardedBadgesQuery,
  FindAwardedBadgesQueryVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useFindAwardedBadges = (userId?: string) => {
  const query = gql`
    query FindAwardedBadges($userId: ID) {
      findAwardedBadges(userId: $userId) {
        badgeId
        title
        description
        recipient
        imageUrl
        jsonUrl
        issuedAt
        expiresAt
      }
    }
  `;

  const { loading, error, data } = useQuery<
    FindAwardedBadgesQuery,
    FindAwardedBadgesQueryVariables
  >(query, {
    variables: { userId }
  });

  return useMemo(
    () => ({
      awardedBadgesLoading: loading,
      awardedBadgesError: error,
      awardedBadges: data?.findAwardedBadges
    }),
    [loading, error, data]
  );
};
