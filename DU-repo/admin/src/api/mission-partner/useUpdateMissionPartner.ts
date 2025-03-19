import { gql, useMutation } from '@apollo/client';

const STATIC_ARRAY = [];

export const useUpdateMissionPartner = () => {
  const mutation = gql`
    mutation UpdateMissionPartner($input: UpdateMissionPartnerInput!) {
      updateMissionPartner(input: $input) {
        id
        name
        description
        affiliateId
        sectionType
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
          dateAdded
          required
        }
      }
    }
  `;
  const [updateMissionPartner, { loading, error, data }] = useMutation(
    mutation,
    {
      refetchQueries: [
        'FindMissionPartnerById',
        'CountAssignedLicensesForMissionPartner',
        'FindLicensesByUserId'
      ]
    }
  );
  return {
    updateMissionPartnerLoading: loading,
    updateMissionPartnerError: error,
    updateMissionPartnerData: (data?.updateMissionPartner || STATIC_ARRAY)[
      'updateMissionPartner'
    ],
    updateMissionPartner: async input =>
      updateMissionPartner({
        variables: {
          input
        }
      })
  };
};
