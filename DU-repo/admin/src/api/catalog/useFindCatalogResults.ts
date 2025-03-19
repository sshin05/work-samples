import { gql, useLazyQuery } from '@apollo/client';
import type {
  FindCatalogResultsQuery,
  FindCatalogResultsQueryVariables
} from '@/api/codegen/graphql';

export const useFindCatalogResults = () => {
  const query = gql`
    query FindCatalogResults(
      $search: String!
      $searchAfter: [String]
      $page: Int
      $pageSize: Int
      $type: String
      $vendorId: String
      $planType: String
      $excludeCustomContent: Boolean
      $missionPartnerId: String
    ) {
      findCatalogResults(
        search: $search
        searchAfter: $searchAfter
        page: $page
        pageSize: $pageSize
        type: $type
        vendorId: $vendorId
        planType: $planType
        excludeCustomContent: $excludeCustomContent
        missionPartnerId: $missionPartnerId
      ) {
        hits {
          __typename
          ... on Course {
            id
            vendorId
            vendorCourseId
            vendorName
            courseDescription
            courseDuration
            courseTitle
            courseUrl
            status
            source
            averageRating
            totalReviews
          }
          ... on Assessment {
            id
            vendorId
            vendorAssessmentId
            vendorName
            assessmentTitle
            assessmentDescription
            assessmentUrl
            assessmentImage
            durationInMinutes
            source
          }
          ... on LearningPath {
            id
            title
            schoolId
            content {
              description
              summary
            }
            version
            vendors
            totalItems
            totalDuration
            enrolledLearners
            averageRating
            totalReviews
          }
          ... on ForceMultiplier {
            id
            version
            title
            fmStatus: status
            learningPathUri
            totalDuration
            unsequenced
            content {
              description
              summary
            }
            type
            totalDuration
            vendors
            averageRating
            totalReviews
          }
          ... on Skill {
            id
            title
            content {
              summary
              description
            }
            vendors
            version
            totalItems
            totalDuration
            enrolledLearners
          }
          ... on Survey {
            id
            name
            description
            durationInMinutes
            missionPartnerId
            status
          }
          ... on Lab {
            id
            name
            description
            durationInMinutes
            missionPartnerId
            missionPartner {
              name
            }
            status
            instructions {
              id
              title
              type
            }
            averageRating
            totalReviews
          }
        }
        searchAfter
        total
      }
    }
  `;
  const [refetch, { loading, error, data }] = useLazyQuery<
    FindCatalogResultsQuery,
    FindCatalogResultsQueryVariables
  >(query);
  const research = async ({
    search,
    type,
    page,
    pageSize,
    searchAfter,
    vendorId,
    planType,
    excludeCustomContent,
    missionPartnerId
  }: FindCatalogResultsQueryVariables) => {
    if (!search) return;
    return refetch({
      variables: {
        search,
        type,
        page,
        pageSize,
        searchAfter,
        vendorId,
        planType,
        excludeCustomContent,
        missionPartnerId
      }
    });
  };
  return {
    resultsLoading: loading,
    resultsError: error,
    results: data?.findCatalogResults,
    searchCatalog: research
  };
};
