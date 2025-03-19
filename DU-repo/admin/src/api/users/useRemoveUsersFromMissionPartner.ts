import { gql, useMutation } from '@apollo/client';
import type {
  RemoveUsersFromMissionPartnerMutation,
  RemoveUsersFromMissionPartnerMutationVariables
} from '@/api/codegen/graphql';

export const useRemoveUsersFromMissionPartner = () => {
  const mutation = gql`
    mutation removeUsersFromMissionPartner(
      $file: Upload!
      $missionPartnerId: ID!
    ) {
      removeUsersFromMissionPartner(
        file: $file
        missionPartnerId: $missionPartnerId
      ) {
        id
        status
        error
      }
    }
  `;
  const [removeUsersFromMissionPartner, { loading, error, data }] = useMutation<
    RemoveUsersFromMissionPartnerMutation,
    RemoveUsersFromMissionPartnerMutationVariables
  >(mutation);
  return {
    removeUsersFromMissionPartner: async (
      file: RemoveUsersFromMissionPartnerMutationVariables['file'],
      missionPartnerId: RemoveUsersFromMissionPartnerMutationVariables['missionPartnerId']
    ) =>
      removeUsersFromMissionPartner({
        variables: {
          file,
          missionPartnerId
        }
      }),
    removeUsersFromMissionPartnerLoading: loading,
    removeUsersFromMissionPartnerError: error,
    removeUsersFromMissionPartnerData:
      data?.removeUsersFromMissionPartner || null
  };
};
