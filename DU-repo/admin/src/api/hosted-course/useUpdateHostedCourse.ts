import { gql, useMutation } from '@apollo/client';
import type {
  UpdatedHostedCourseInput,
  UpdateHostedCourseMutation,
  UpdateHostedCourseMutationVariables
} from '@/api/codegen/graphql';

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

export const useUpdateHostedCourse = () => {
  const mutation = gql`
    mutation UpdateHostedCourse($input: UpdatedHostedCourseInput!) {
      updateHostedCourse(input: $input) {
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
  const [updateHostedCourse, { loading, error, data }] = useMutation<
    UpdateHostedCourseMutation,
    UpdateHostedCourseMutationVariables
  >(mutation, { refetchQueries: ['FindMissionPartnerById'] });
  return {
    updateHostedCourse: async (input: UpdatedHostedCourseInput) =>
      updateHostedCourse({
        variables: {
          input
        }
      }),
    updateHostedCourseLoading: loading,
    updateHostedCourseError: error,
    updateHostedCourseData: data?.updateHostedCourse ?? STATIC_OBJECT
  };
};
