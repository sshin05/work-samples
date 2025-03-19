import { gql, useMutation } from '@apollo/client';
import type {
  AssociateJobRolesToKsatMutation,
  AssociateJobRolesToKsatMutationVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useAssociateJobRolesToKsat = () => {
  const mutation = gql`
    mutation AssociateJobRolesToKsat($ksatId: ID!, $jobRoleIds: [ID!]!) {
      associateJobRolesToKsat(ksatId: $ksatId, jobRoleIds: $jobRoleIds)
    }
  `;

  const [associateJobRolesToKsat, { loading, error, data }] = useMutation<
    AssociateJobRolesToKsatMutation,
    AssociateJobRolesToKsatMutationVariables
  >(mutation, {
    refetchQueries: ['FindKsats', 'GetKsat']
  });

  return useMemo(
    () => ({
      associateJobRolesToKsat: (
        ksatId: AssociateJobRolesToKsatMutationVariables['ksatId'],
        jobRoleIds: AssociateJobRolesToKsatMutationVariables['jobRoleIds']
      ) =>
        associateJobRolesToKsat({
          variables: {
            ksatId,
            jobRoleIds
          }
        }),
      associateJobRolesToKsatLoading: loading,
      associateJobRolesToKsatError: error,
      associateJobRolesToKsatData: data
    }),
    [loading, error, data, associateJobRolesToKsat]
  );
};
