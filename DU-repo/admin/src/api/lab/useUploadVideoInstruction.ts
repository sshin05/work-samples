import { gql, useMutation } from '@apollo/client';
import type {
  UploadVideoInstructionMutation,
  UploadVideoInstructionMutationVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

const STATIC_OBJECT: unknown = {};

export const useUploadVideoInstruction = () => {
  const mutation = gql`
    mutation UploadVideoInstruction(
      $labId: ID!
      $labInstructionId: ID!
      $file: Upload!
    ) {
      uploadVideoInstruction(
        labId: $labId
        labInstructionId: $labInstructionId
        file: $file
      ) {
        id
      }
    }
  `;
  const [uploadVideoInstruction, { loading, error, data }] = useMutation<
    UploadVideoInstructionMutation,
    UploadVideoInstructionMutationVariables
  >(mutation);
  return useMemo(
    () => ({
      uploadVideoInstruction: (
        labId: string,
        labInstructionId: string,
        file: unknown
      ) =>
        uploadVideoInstruction({
          variables: {
            labId,
            labInstructionId,
            file
          }
        }),
      uploadVideoInstructionLoading: loading,
      uploadVideoInstructionError: error,
      uploadVideoInstructionData: data?.uploadVideoInstruction ?? STATIC_OBJECT
    }),
    [loading, error, data, uploadVideoInstruction]
  );
};
