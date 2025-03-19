import { gql, useMutation } from '@apollo/client';

export const useExportBadges = () => {
  const mutation = gql`
    mutation ExportBadges(
      $ownerId: String
      $missionPartnerId: String
      $badgeId: String
    ) {
      exportBadges(
        ownerId: $ownerId
        missionPartnerId: $missionPartnerId
        badgeId: $badgeId
      )
    }
  `;
  const [exportBadges, { loading, error }] = useMutation(mutation);
  return {
    exportBadges: async (
      ownerId?: string,
      missionPartnerId?: string,
      badgeId?: string
    ) =>
      exportBadges({
        variables: {
          ownerId,
          missionPartnerId,
          badgeId
        }
      }),
    exportBadgesLoading: loading,
    exportBadgesError: error
  };
};
