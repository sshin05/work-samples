import { gql, useMutation } from '@apollo/client';
import type {
  UploadOfficeFileMutation,
  UploadOfficeFileMutationVariables
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

export const useUploadOfficeFile = () => {
  const mutation = gql`
    mutation UploadOfficeFile($input: OfficeFileInput!, $missionPartnerId: ID) {
      uploadOfficeFile(input: $input, missionPartnerId: $missionPartnerId) {
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
  const [uploadOfficeFile, { loading, error, data }] = useMutation<
    UploadOfficeFileMutation,
    UploadOfficeFileMutationVariables
  >(mutation);
  return {
    uploadOfficeFile: async (
      input: UploadOfficeFileMutationVariables['input']
    ) =>
      uploadOfficeFile({
        variables: {
          input
        }
      }),
    uploadOfficeFileLoading: loading,
    uploadOfficeFileError: error,
    uploadOfficeFileData: data?.uploadOfficeFile ?? STATIC_OBJECT
  };
};
