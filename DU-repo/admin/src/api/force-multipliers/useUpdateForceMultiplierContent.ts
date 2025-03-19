import { gql, useMutation } from '@apollo/client';
import type {
  UpdateForceMultiplierContentInput,
  UpdateForceMultiplierContentMutation,
  UpdateForceMultiplierContentMutationVariables
} from '@/api/codegen/graphql';

const STATIC_ARRAY: never[] = [];

export const useUpdateForceMultiplierContent = () => {
  const mutation = gql`
    mutation UpdateForceMultiplierContent(
      $input: UpdateForceMultiplierContentInput!
    ) {
      updateForceMultiplierContent(input: $input) {
        id
        version
        title
        status
        learningPathUri
        missionPartnerId
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
    UpdateForceMultiplierContentMutation,
    UpdateForceMultiplierContentMutationVariables
  >(mutation);
  const updateForceMultiplierContent = async (
    input: UpdateForceMultiplierContentInput
  ) =>
    update({
      variables: {
        input
      }
    });
  return {
    updateForceMultiplierContent,
    updateForceMultiplierContentLoading: loading,
    updateForceMultiplierContentError: error,
    updateForceMultiplierContentData:
      data?.updateForceMultiplierContent || STATIC_ARRAY
  };
};
