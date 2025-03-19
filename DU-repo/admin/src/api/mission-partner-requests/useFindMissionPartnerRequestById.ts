import { gql, useQuery } from '@apollo/client';
import type {
  FindMissionPartnerRequestByIdQuery,
  FindMissionPartnerRequestByIdQueryVariables
} from '@/api/codegen/graphql';

export const useFindMissionPartnerRequestById = (
  missionPartnerId: string,
  userId: string
) => {
  const query = gql`
    query FindMissionPartnerRequestById($missionPartnerId: ID!, $userId: ID!) {
      findMissionPartnerRequestById(
        missionPartnerId: $missionPartnerId
        userId: $userId
      ) {
        missionPartnerId
        missionPartnerName
        userId
        userFirstName
        userLastName
        userEmail
        status
        requestedAt
        approvedAt
        declinedAt
      }
    }
  `;
  const { loading, error, data, refetch } = useQuery<
    FindMissionPartnerRequestByIdQuery,
    FindMissionPartnerRequestByIdQueryVariables
  >(query, {
    variables: {
      missionPartnerId,
      userId
    },
    skip: !missionPartnerId || !userId
  });
  return {
    findMissionPartnerRequestByIdLoading: loading,
    findMissionPartnerRequestByIdError: error,
    findMissionPartnerRequestByIdData: data?.findMissionPartnerRequestById,
    refetchFindMissionPartnerRequestById: refetch
  };
};
