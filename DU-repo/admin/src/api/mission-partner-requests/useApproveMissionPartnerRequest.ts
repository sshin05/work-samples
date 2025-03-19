import { gql, useMutation } from '@apollo/client';
import type {
  ApproveMissionPartnerRequestMutation,
  ApproveMissionPartnerRequestMutationVariables
} from '@/api/codegen/graphql';

export const useApproveMissionPartnerRequest = (
  missionPartnerId: string,
  userId: string
) => {
  const mutation = gql`
    mutation ApproveMissionPartnerRequest(
      $missionPartnerId: ID!
      $userId: ID!
    ) {
      approveMissionPartnerRequest(
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
  const [approveMissionPartnerRequest, { loading, error, data }] = useMutation<
    ApproveMissionPartnerRequestMutation,
    ApproveMissionPartnerRequestMutationVariables
  >(mutation, {
    refetchQueries: [
      'FindOpenForMissionPartner',
      'CountUsersByMissionPartnerId'
    ]
  });
  return {
    approveMissionPartnerRequestLoading: loading,
    approveMissionPartnerRequestError: error,
    approveMissionPartnerRequestData: data?.approveMissionPartnerRequest,
    approveMissionPartnerRequest: async () =>
      approveMissionPartnerRequest({
        variables: {
          missionPartnerId,
          userId
        }
      })
  };
};
