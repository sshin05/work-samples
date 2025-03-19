import { gql, useMutation } from '@apollo/client';
import type {
  HostedVideoInput,
  UploadHostedVideoMutation,
  UploadHostedVideoMutationVariables
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

export const useUploadHostedVideo = () => {
  const mutation = gql`
    mutation UploadHostedVideo(
      $input: HostedVideoInput!
      $missionPartnerId: ID
    ) {
      uploadHostedVideo(input: $input, missionPartnerId: $missionPartnerId) {
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
    }
  `;
  const [uploadHostedVideo, { loading, error, data }] = useMutation<
    UploadHostedVideoMutation,
    UploadHostedVideoMutationVariables
  >(mutation);
  return {
    uploadHostedVideo: async (
      input: HostedVideoInput,
      missionPartnerId: UploadHostedVideoMutationVariables['missionPartnerId']
    ) =>
      uploadHostedVideo({
        variables: {
          input,
          missionPartnerId
        }
      }),
    uploadHostedVideoLoading: loading,
    uploadHostedVideoError: error,
    uploadHostedVideoData: data?.uploadHostedVideo ?? STATIC_OBJECT
  };
};
