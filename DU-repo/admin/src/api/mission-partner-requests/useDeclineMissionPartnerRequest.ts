import { gql, useMutation } from '@apollo/client';
import type {
  DeclineMissionPartnerRequestMutation,
  DeclineMissionPartnerRequestMutationVariables
} from '@/api/codegen/graphql';

export const useDeclineMissionPartnerRequest = (
  missionPartnerId: string,
  userId: string
) => {
  const mutation = gql`
    mutation DeclineMissionPartnerRequest(
      $missionPartnerId: ID!
      $userId: ID!
    ) {
      declineMissionPartnerRequest(
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
  const [declineMissionPartnerRequest, { loading, error, data }] = useMutation<
    DeclineMissionPartnerRequestMutation,
    DeclineMissionPartnerRequestMutationVariables
  >(mutation, {
    refetchQueries: ['FindOpenForMissionPartner']
  });
  return {
    declineMissionPartnerRequestLoading: loading,
    declineMissionPartnerRequestError: error,
    declineMissionPartnerRequestData: data?.declineMissionPartnerRequest,
    declineMissionPartnerRequest: async () =>
      declineMissionPartnerRequest({
        variables: {
          missionPartnerId,
          userId
        }
      })
  };
};
