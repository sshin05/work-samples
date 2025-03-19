import { gql, useMutation } from '@apollo/client';
import type {
  DeclineLicenseRequestMutation,
  DeclineLicenseRequestMutationVariables
} from '@/api/codegen/graphql';

export const useDeclineLicenseRequest = () => {
  const mutation = gql`
    mutation declineLicenseRequest($id: ID!) {
      declineLicenseRequest(id: $id) {
        id
        vendorId
        vendorName
        userId
        userFirstName
        userLastName
        userEmail
        userOrganization
        missionPartnerId
        missionPartnerName
        status
        requestedAt
        approvedAt
        declinedAt
      }
    }
  `;
  const [declineLicenseRequest, { loading, error, data }] = useMutation<
    DeclineLicenseRequestMutation,
    DeclineLicenseRequestMutationVariables
  >(mutation, {
    refetchQueries: [
      'FindOpenLicenseRequests',
      'CountAssignedLicensesForMissionPartner'
    ]
  });
  return {
    declineLicenseRequest: async (
      id: DeclineLicenseRequestMutationVariables['id']
    ) =>
      declineLicenseRequest({
        variables: {
          id
        }
      }),
    declineLicenseRequestLoading: loading,
    declineLicenseRequestError: error,
    declineLicenseRequestData: data?.declineLicenseRequest
  };
};
