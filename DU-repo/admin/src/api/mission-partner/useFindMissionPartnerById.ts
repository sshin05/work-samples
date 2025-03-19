import { gql, useQuery } from '@apollo/client';

export const useFindMissionPartnerById = (id: string) => {
  const query = gql`
    query FindMissionPartnerById($id: ID!) {
      findMissionPartnerById(id: $id) {
        id
        name
        description
        accessCode
        affiliateId
        sectionType
        logoUrl
        slug
        customTrainingEnabled
        isMarketplaceEnabled
        enabledReports {
          description
          id
          name
        }
        provisionedLicenses {
          vendorId
          vendorName
          provisioned
          autoAssignmentEnabled
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
          assigned
          started
          completed
          stopped
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
        labs {
          id
          name
          durationInMinutes
          status
          createdAt
          updatedAt
        }
        forceMultipliers {
          id
          title
          status
          version
          enrolledLearners
          totalDuration
          changeLog {
            createdAt
          }
          _createdAt
          _updatedAt
        }
        collections {
          id
          name
          description
          items {
            type
            courseId
            assessmentId
            planType
            planSourceId
            planVersion
            title
            description
            vendors
            dateAdded
          }
        }
        trialEnabled
        trialStartDate
        trialEndDate
      }
    }
  `;
  const { refetch, loading, error, data } = useQuery(query, {
    variables: {
      id
    },
    skip: !id
  });
  return {
    missionPartnerLoading: loading,
    missionPartnerError: error,
    missionPartner: data?.findMissionPartnerById,
    refetchMissionPartner: refetch
  };
};
