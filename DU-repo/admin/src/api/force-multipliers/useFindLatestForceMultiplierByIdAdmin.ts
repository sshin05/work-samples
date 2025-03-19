import { gql, useQuery } from '@apollo/client';
import type {
  FindLatestForceMultiplierByIdAdminQuery,
  FindLatestForceMultiplierByIdAdminQueryVariables
} from '@/api/codegen/graphql';
import { useState } from 'react';

export const useFindLatestForceMultiplierByIdAdmin = (
  forceMultiplerId = ''
) => {
  const query = gql`
    query FindLatestForceMultiplierByIdAdmin($forceMultiplerId: ID!) {
      findLatestForceMultiplierByIdAdmin(id: $forceMultiplerId) {
        id
        version
        title
        status
        learningPathUri
        totalDuration
        unsequenced
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
          item {
            __typename
            ... on Course {
              vendorCourseId
              vendorName
              courseTitle
              courseUrl
              courseDuration
              source
            }
            ... on Assessment {
              vendorAssessmentId
              vendorName
              assessmentTitle
              assessmentUrl
              durationInMinutes
              source
            }
            ... on Survey {
              id
              name
              durationInMinutes
              missionPartner {
                id
                name
              }
            }
            ... on Lab {
              id
              name
              durationInMinutes
              missionPartner {
                id
                name
              }
            }
          }
        }
        libraryItems {
          id
          type
          name
          url
        }
        conditions {
          all {
            value
            operator
            fact
          }
        }
        type
        totalDuration
      }
    }
  `;

  // loading state stays false and networkStatus remains NetworkStatus.ready
  // when calling refetch and skip is being used. Possibly a bug? This will
  // manage the loading state of refetch for now
  const [isRefetchLoading, setIsRefetchLoading] = useState(false);
  const { refetch, loading, error, data } = useQuery<
    FindLatestForceMultiplierByIdAdminQuery,
    FindLatestForceMultiplierByIdAdminQueryVariables
  >(query, {
    skip: !forceMultiplerId,
    variables: {
      forceMultiplerId: forceMultiplerId || ''
    },
    fetchPolicy: 'cache-and-network'
  });

  const fetchForceMultiplier = async (forceMultiplerId: string) => {
    setIsRefetchLoading(true);
    refetch({ forceMultiplerId }).finally(() => setIsRefetchLoading(false));
  };

  return {
    forceMultiplierByIdLoading: loading || isRefetchLoading,
    forceMultiplierByIdError: error,
    forceMultiplierById: data?.findLatestForceMultiplierByIdAdmin || null,
    fetchForceMultiplierById: fetchForceMultiplier
  };
};
