import { gql, useQuery } from '@apollo/client';
import type {
  FindAllMissionPartnersAdminPortalQuery,
  FindAllMissionPartnersAdminPortalQueryVariables
} from '@/api/codegen/graphql';

const STATIC_ARRAY = [];

export const useFindAllMissionPartnersAdminPortal = () => {
  const query = gql`
    query FindAllMissionPartnersAdminPortal {
      findAllMissionPartnersAdminPortal {
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
        exams {
          id
          name
          durationInMinutes
          createdAt
          updatedAt
          status
        }
        courses {
          id
          name
          duration
          createdAt
          updatedAt
          status
        }
        scorms {
          id
          name
          duration
          status
          createdAt
          updatedAt
        }
        surveys {
          id
          name
          durationInMinutes
          status
          createdAt
          updatedAt
        }
        enabledReports {
          id
          name
        }
      }
    }
  `;
  const { refetch, loading, error, data } = useQuery<
    FindAllMissionPartnersAdminPortalQuery,
    FindAllMissionPartnersAdminPortalQueryVariables
  >(query);
  return {
    missionPartnersLoading: loading,
    missionPartnersError: error,
    missionPartners: (data?.findAllMissionPartnersAdminPortal ||
      STATIC_ARRAY) as FindAllMissionPartnersAdminPortalQuery['findAllMissionPartnersAdminPortal'],
    refetchMissionPartners: refetch
  };
};
