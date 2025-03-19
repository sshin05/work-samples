import { gql, useMutation } from '@apollo/client';
import type {
  CreateNewForceMultiplierVersionMutation,
  CreateNewForceMultiplierVersionMutationVariables
} from '@/api/codegen/graphql';

export const useCreateNewForceMultiplierVersion = () => {
  const mutation = gql`
    mutation CreateNewForceMultiplierVersion($id: String!) {
      createNewForceMultiplierVersion(id: $id) {
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
  const [_createNewForceMultiplierVersion, { loading, error, data }] =
    useMutation<
      CreateNewForceMultiplierVersionMutation,
      CreateNewForceMultiplierVersionMutationVariables
    >(mutation);
  const createNewForceMultiplierVersion = async (id: string) =>
    _createNewForceMultiplierVersion({
      variables: {
        id
      }
    });
  return {
    createNewForceMultiplierVersion,
    createNewForceMultiplierVersionLoading: loading,
    createNewForceMultiplierVersionError: error,
    createNewForceMultiplierVersionData: data
  };
};
