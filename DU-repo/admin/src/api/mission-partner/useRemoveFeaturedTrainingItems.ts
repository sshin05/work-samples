import { gql, useMutation } from '@apollo/client';
import type {
  RemoveFeaturedTrainingItemsInput,
  RemoveFeaturedTrainingItemsMutation,
  RemoveFeaturedTrainingItemsMutationVariables
} from '@/api/codegen/graphql';

const STATIC_ARRAY = [];

export const useRemoveFeaturedTrainingItems = () => {
  const mutation = gql`
    mutation RemoveFeaturedTrainingItems(
      $missionPartnerId: ID!
      $input: [RemoveFeaturedTrainingItemsInput]!
    ) {
      removeFeaturedTrainingItems(
        missionPartnerId: $missionPartnerId
        input: $input
      ) {
        featuredTraining {
          type
          courseId
          assessmentId
          labId
          planType
          planSourceId
          planVersion
        }
      }
    }
  `;
  const [removeFeaturedTrainingItems, { loading, error, data }] = useMutation<
    RemoveFeaturedTrainingItemsMutation,
    RemoveFeaturedTrainingItemsMutationVariables
  >(mutation, {
    refetchQueries: ['FindMissionPartnerById']
  });
  return {
    removeFeaturedTrainingItemsLoading: loading,
    removeFeaturedTrainingItemsError: error,
    removeFeaturedTrainingItemsData: (data ||
      STATIC_ARRAY) as RemoveFeaturedTrainingItemsMutation['removeFeaturedTrainingItems'],
    removeFeaturedTrainingItems: async (
      missionPartnerId: string,
      input: RemoveFeaturedTrainingItemsInput[]
    ) => {
      removeFeaturedTrainingItems({
        variables: {
          missionPartnerId,
          input
        }
      });
    }
  };
};
