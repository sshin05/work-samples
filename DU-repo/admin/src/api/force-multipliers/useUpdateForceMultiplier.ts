import { gql, useMutation } from '@apollo/client';
import type {
  UpdateForceMultiplierMutation,
  UpdateForceMultiplierMutationVariables
} from '@/api/codegen/graphql';

const STATIC_ARRAY: never[] = [];

export const useUpdateForceMultiplier = () => {
  const mutation = gql`
    mutation UpdateForceMultiplier($input: ForceMultiplierInput!) {
      updateForceMultiplier(input: $input) {
        id
        version
        title
        status
        learningPathUri
        missionPartnerId
        modules {
          id
          title
          items {
            itemId
          }
        }
        content {
          description
          summary
          about {
            title
            description
            image
            imageAltText
          }
        }
        items {
          id
        }
        libraryItems {
          id
        }
        conditions {
          all {
            value
            operator
            fact
          }
        }
      }
    }
  `;
  const [update, { loading, error, data }] = useMutation<
    UpdateForceMultiplierMutation,
    UpdateForceMultiplierMutationVariables
  >(mutation, { refetchQueries: ['FindMissionPartnerById'] });
  const updateForceMultiplier = async (
    input: UpdateForceMultiplierMutationVariables['input']
  ) =>
    update({
      variables: {
        input
      }
    });
  return {
    updateForceMultiplier,
    updateForceMultiplierLoading: loading,
    updateForceMultiplierError: error,
    updateForceMultiplierData: data?.updateForceMultiplier || STATIC_ARRAY
  };
};
