import { gql, useMutation } from '@apollo/client';

export const useAddRecentMissionPartners = () => {
  const mutation = gql`
    mutation UpdateRecentMissionPartner($missionPartnerId: ID!) {
      updateRecentMissionPartner(missionPartnerId: $missionPartnerId)
    }
  `;
  const [addRecentMissionPartners, { loading, error, data }] = useMutation(
    mutation,
    { refetchQueries: ['GetRecentMissionPartners'] }
  );
  return {
    addRecentMissionPartners: async (missionPartnerId: string) =>
      addRecentMissionPartners({
        variables: {
          missionPartnerId
        }
      }),
    groupMembershipLoading: loading,
    groupMembershipError: error,
    groupMembershipData: data?.addRecentMissionPartners || null
  };
};
