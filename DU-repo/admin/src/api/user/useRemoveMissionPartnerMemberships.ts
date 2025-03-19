import { gql, useMutation } from '@apollo/client';

export const useRemoveMissionPartnerMemberships = () => {
  const mutation = gql`
    mutation removeMissionPartnerMemberships(
      $userIds: [ID!]!
      $missionPartnerId: ID!
    ) {
      removeMissionPartnerMemberships(
        userIds: $userIds
        missionPartnerId: $missionPartnerId
      )
    }
  `;

  const [removeMissionPartnerMemberships, { loading, error, data }] =
    useMutation(mutation);
  return {
    removeMissionPartnerMemberships: (
      userIds: string | string[],
      missionPartnerId: string
    ) =>
      removeMissionPartnerMemberships({
        variables: {
          userIds,
          missionPartnerId
        }
      }),
    removeMissionPartnerMembershipsLoading: loading,
    removeMissionPartnerMembershipsError: error,
    removeMissionPartnerMembershipsData:
      data?.removeMissionPartnerMemberships || null
  };
};
