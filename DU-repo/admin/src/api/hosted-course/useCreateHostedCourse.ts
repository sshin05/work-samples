import { gql, useMutation } from '@apollo/client';
import type {
  CreateHostedCourseMutation,
  CreateHostedCourseMutationVariables,
  NewHostedCourseInput
} from '@/api/codegen/graphql';

export const useCreateHostedCourse = () => {
  const mutation = gql`
    mutation CreateHostedCourse($hostedCourseInput: NewHostedCourseInput!) {
      createHostedCourse(hostedCourseInput: $hostedCourseInput) {
        id
        name
      }
    }
  `;
  const [createHostedCourse, { loading, error, data }] = useMutation<
    CreateHostedCourseMutation,
    CreateHostedCourseMutationVariables
  >(mutation, { refetchQueries: ['FindMissionPartnerById'] });
  return {
    createHostedCourse: async (hostedCourseInput: NewHostedCourseInput) =>
      createHostedCourse({
        variables: {
          hostedCourseInput
        }
      }),
    createHostedCourseLoading: loading,
    createHostedCourseError: error,
    createHostedCourseData: data
  };
};
