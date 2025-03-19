import { gql, useMutation } from '@apollo/client';
import type {
  ApproveLicenseRequestMutation,
  ApproveLicenseRequestMutationVariables
} from '@/api/codegen/graphql';

export const useApproveLicenseRequest = () => {
  const mutation = gql`
    mutation approveLicenseRequest($id: ID!) {
      approveLicenseRequest(id: $id) {
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
  const [approveLicenseRequest, { loading, error, data }] = useMutation<
    ApproveLicenseRequestMutation,
    ApproveLicenseRequestMutationVariables
  >(mutation, {
    refetchQueries: [
      'FindOpenLicenseRequests',
      'CountAssignedLicensesForMissionPartner'
    ]
  });
  return {
    approveLicenseRequest: async (
      id: ApproveLicenseRequestMutationVariables['id']
    ) =>
      approveLicenseRequest({
        variables: {
          id
        }
      }),
    approveLicenseRequestLoading: loading,
    approveLicenseRequestError: error,
    approveLicenseRequestData: data?.approveLicenseRequest
  };
};
