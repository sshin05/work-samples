import { gql, useMutation } from '@apollo/client';
import type {
  AssociateDomainToKsatMutation,
  AssociateDomainToKsatMutationVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useAssociateDomainToKsat = () => {
  const mutation = gql`
    mutation AssociateDomainToKsat($ksatId: ID!, $domainId: ID!) {
      associateDomainToKsat(ksatId: $ksatId, domainId: $domainId)
    }
  `;

  const [associateDomainToKsat, { loading, error, data }] = useMutation<
    AssociateDomainToKsatMutation,
    AssociateDomainToKsatMutationVariables
  >(mutation, {
    refetchQueries: ['FindKsats', 'GetKsat']
  });

  return useMemo(
    () => ({
      associateDomainToKsat: (
        ksatId: AssociateDomainToKsatMutationVariables['ksatId'],
        domainId: AssociateDomainToKsatMutationVariables['domainId']
      ) =>
        associateDomainToKsat({
          variables: {
            ksatId,
            domainId
          }
        }),
      associateDomainToKsatLoading: loading,
      associateDomainToKsatError: error,
      associateDomainToKsatData: data
    }),
    [loading, error, data, associateDomainToKsat]
  );
};
