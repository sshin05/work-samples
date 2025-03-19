import { gql, useMutation } from '@apollo/client';
import type {
  UploadHostedCourseImageMutation,
  UploadHostedCourseImageMutationVariables
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

export const useUploadHostedCourseImage = () => {
  const mutation = gql`
    mutation UploadHostedCourseImage($file: Upload!, $missionPartnerId: ID) {
      uploadHostedCourseImage(
        file: $file
        missionPartnerId: $missionPartnerId
      ) {
        url
      }
    }
  `;
  const [uploadHostedCourseImage, { loading, error, data }] = useMutation<
    UploadHostedCourseImageMutation,
    UploadHostedCourseImageMutationVariables
  >(mutation);
  return {
    uploadHostedCourseImage: async (
      file: UploadHostedCourseImageMutationVariables['file'],
      missionPartnerId: UploadHostedCourseImageMutationVariables['missionPartnerId']
    ) =>
      uploadHostedCourseImage({
        variables: {
          file,
          missionPartnerId
        }
      }),
    uploadHostedCourseImageLoading: loading,
    uploadHostedCourseImageError: error,
    uploadHostedCourseImageData: data?.uploadHostedCourseImage ?? STATIC_OBJECT
  };
};
