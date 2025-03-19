import { gql, useMutation } from '@apollo/client';
import type {
  CreateCollectionMutation,
  CreateCollectionMutationVariables
} from '@/api/codegen/graphql';

const STATIC_ARRAY = [];

export const useCreateCollection = () => {
  const mutation = gql`
    mutation CreateCollection(
      $name: String!
      $description: String!
      $missionPartnerId: ID!
    ) {
      createCollection(
        name: $name
        description: $description
        missionPartnerId: $missionPartnerId
      ) {
        collections {
          name
          description
        }
      }
    }
  `;
  const [createCollection, { loading, error, data }] = useMutation<
    CreateCollectionMutation,
    CreateCollectionMutationVariables
  >(mutation, {
    refetchQueries: ['FindMissionPartnerById']
  });
  return {
    createCollection: async (
      name: string,
      description: string,
      missionPartnerId: string
    ) =>
      createCollection({
        variables: {
          name,
          description,
          missionPartnerId
        }
      }),
    createCollectionLoading: loading,
    createCollectionError: error,
    createCollectionData: (data?.createCollection ||
      STATIC_ARRAY) as CreateCollectionMutation['createCollection']
  };
};
