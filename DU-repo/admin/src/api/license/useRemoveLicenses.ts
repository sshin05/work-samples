import { gql, useMutation } from '@apollo/client';
import type {
  RemoveLicensesMutation,
  RemoveLicensesMutationVariables
} from '@/api/codegen/graphql';

export const useRemoveLicenses = () => {
  const mutation = gql`
    mutation removeLicenses($input: RemoveLicensesInput!) {
      removeLicenses(input: $input)
    }
  `;
  const [removeLicenses, { loading, error }] = useMutation<
    RemoveLicensesMutation,
    RemoveLicensesMutationVariables
  >(mutation, { refetchQueries: ['FindLicenseStatusCounts'] });

  return {
    removeLicenses: async (
      vendorId: string,
      missionPartnerId: string,
      userIds: Array<string>
    ) =>
      removeLicenses({
        variables: {
          input: {
            vendorId,
            missionPartnerId,
            userIds
          }
        }
      }),
    removeLicensesLoading: loading,
    removeLicensesError: error
  };
};
