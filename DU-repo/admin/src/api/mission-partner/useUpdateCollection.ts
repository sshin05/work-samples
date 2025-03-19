import { gql, useMutation } from '@apollo/client';
import type {
  UpdateCollectionItemsMutation,
  UpdateCollectionItemsMutationVariables
} from '@/api/codegen/graphql';

export const useUpdateCollection = () => {
  const mutation = gql`
    mutation UpdateCollectionItems(
      $Id: ID!
      $name: String
      $description: String
      $missionPartnerId: ID!
    ) {
      updateCollection(
        id: $Id
        name: $name
        description: $description
        missionPartnerId: $missionPartnerId
      ) {
        collections {
          id
          name
          description
        }
      }
    }
  `;
  const [updateCollection, { loading, error, data }] = useMutation<
    UpdateCollectionItemsMutation,
    UpdateCollectionItemsMutationVariables
  >(mutation, {
    refetchQueries: ['FindMissionPartnerById']
  });
  return {
    updateCollection: async (
      Id: string,
      name: string,
      description: string,
      missionPartnerId: string
    ) =>
      updateCollection({
        variables: {
          Id,
          name,
          description,
          missionPartnerId
        }
      }),
    addCollectionItemsLoading: loading,
    addCollectionItemsError: error,
    addCollectionItemsData: data?.updateCollection
  };
};
