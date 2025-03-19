import { gql, useQuery } from '@apollo/client';
import type {
  FindLatestForceMultiplierByIdQuery,
  FindLatestForceMultiplierByIdQueryVariables
} from '@/api/codegen/graphql';

export const useFindLatestForceMultiplierById = (forceMultiplerId = '') => {
  const query = gql`
    query FindLatestForceMultiplierById($forceMultiplerId: ID!) {
      findLatestForceMultiplierById(id: $forceMultiplerId) {
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
  const { refetch, loading, error, data } = useQuery<
    FindLatestForceMultiplierByIdQuery,
    FindLatestForceMultiplierByIdQueryVariables
  >(query, {
    skip: !forceMultiplerId,
    variables: {
      forceMultiplerId: forceMultiplerId || ''
    }
  });
  const fetchForceMultiplier = async (forceMultiplerId: string) =>
    refetch({
      forceMultiplerId
    });
  return {
    forceMultiplierByIdLoading: loading,
    forceMultiplierByIdError: error,
    forceMultiplierById: data?.findLatestForceMultiplierById || null,
    fetchForceMultiplierById: fetchForceMultiplier
  };
};
