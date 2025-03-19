import { gql, useMutation } from '@apollo/client';
import type {
  CreateMissionPartnerInput,
  CreateMissionPartnerMutation,
  CreateMissionPartnerMutationVariables
} from '@/api/codegen/graphql';

export const useCreateMissionPartner = () => {
  const mutation = gql`
    mutation CreateMissionPartner($input: CreateMissionPartnerInput!) {
      createMissionPartner(input: $input) {
        id
        name
        affiliateId
        sectionType
        logoUrl
        slug
        provisionedLicenses {
          vendorId
          vendorName
          provisioned
        }
      }
    }
  `;
  const [createMissionPartner, { loading, error, data }] = useMutation<
    CreateMissionPartnerMutation,
    CreateMissionPartnerMutationVariables
  >(mutation);
  return {
    createMissionPartnerLoading: loading,
    createMissionPartnerError: error,
    createMissionPartnerData: data?.createMissionPartner,
    createMissionPartner: async (input: CreateMissionPartnerInput) =>
      createMissionPartner({
        variables: {
          input
        }
      })
  };
};
