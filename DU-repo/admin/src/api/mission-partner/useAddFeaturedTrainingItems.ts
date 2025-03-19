import { gql, useMutation } from '@apollo/client';
import type { AddFeaturedTrainingItemsMutation } from '@/api/codegen/graphql';

const STATIC_ARRAY = [];

export const useAddFeaturedTrainingItems = () => {
  const mutation = gql`
    mutation AddFeaturedTrainingItems($input: UpdateMissionPartnerInput!) {
      addFeaturedTrainingItems(input: $input) {
        id
        name
        affiliateId
        logoUrl
        slug
        provisionedLicenses {
          vendorId
          vendorName
          provisioned
        }
        featuredTraining {
          type
          courseId
          assessmentId
          labId
          planType
          planSourceId
          planVersion
          title
          description
          vendors
          dateAdded
          required
        }
      }
    }
  `;
  const [addFeaturedTrainingItems, { loading, error, data }] = useMutation(
    mutation,
    {
      refetchQueries: ['FindMissionPartnerById']
    }
  );
  return {
    addFeaturedTrainingItemsLoading: loading,
    addFeaturedTrainingItemsError: error,
    addFeaturedTrainingItemsData: (data?.addFeaturedTrainingItems ||
      STATIC_ARRAY) as AddFeaturedTrainingItemsMutation['addFeaturedTrainingItems'],
    addFeaturedTrainingItems: async input =>
      addFeaturedTrainingItems({
        variables: {
          input
        }
      })
  };
};
