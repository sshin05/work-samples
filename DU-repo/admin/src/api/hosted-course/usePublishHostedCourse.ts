import { gql, useMutation } from '@apollo/client';

const STATIC_OBJECT = {};

/*
const HOSTED_COURSE_FRAGMENT = gql`
  fragment HostedCourseFields on HostedCourse {
    id
    name
    description
    duration
    missionPartnerId
    createdAt
    updatedAt
    items
    status
  }
`;
*/

// TODO: Come back to fix the codegen

export const usePublishHostedCourse = () => {
  const mutation = gql`
    mutation PublishHostedCourse($id: ID!, $missionPartnerId: ID) {
      publishHostedCourse(id: $id, missionPartnerId: $missionPartnerId) {
        id
        name
        createdAt
        updatedAt
        missionPartnerId
        description
        duration
        items
        status
      }
    }
  `;
  const [publishHostedCourse, { loading, error, data }] = useMutation(
    mutation,
    { refetchQueries: ['FindMissionPartnerById'] }
  );
  return {
    publishHostedCourse: async (id: string, missionPartnerId: string) =>
      publishHostedCourse({
        variables: {
          id,
          missionPartnerId
        }
      }),
    publishHostedCourseLoading: loading,
    publishHostedCourseError: error,
    publishHostedCourseData: data?.publishHostedCourse ?? STATIC_OBJECT
  };
};
