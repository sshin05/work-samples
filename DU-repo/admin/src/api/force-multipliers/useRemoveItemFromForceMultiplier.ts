import { gql, useMutation } from '@apollo/client';
import type {
  RemoveItemFromForceMultiplierMutation,
  RemoveItemFromForceMultiplierMutationVariables
} from '@/api/codegen/graphql';

const STATIC_OBJECT = {};

export const useRemoveItemFromForceMultiplier = () => {
  const mutation = gql`
    mutation RemoveItemFromForceMultiplier(
      $input: RemoveItemFromForceMultiplierInput!
    ) {
      removeItemFromForceMultiplier(input: $input) {
        id
        version
        title
        items {
          id
        }
      }
    }
  `;
  const [update, { loading, error, data }] = useMutation<
    RemoveItemFromForceMultiplierMutation,
    RemoveItemFromForceMultiplierMutationVariables
  >(mutation);
  const removeItemFromForceMultiplier = async (
    inputVariables: RemoveItemFromForceMultiplierMutationVariables['input']
  ) =>
    update({
      variables: {
        input: inputVariables
      }
    });
  return {
    removeItemFromForceMultiplier,
    removeItemFromForceMultiplierLoading: loading,
    removeItemFromForceMultiplierError: error,
    removeItemFromForceMultiplierData:
      data?.removeItemFromForceMultiplier ?? STATIC_OBJECT
  };
};
