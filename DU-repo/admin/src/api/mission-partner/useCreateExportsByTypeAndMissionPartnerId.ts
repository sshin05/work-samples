import { gql, useMutation } from '@apollo/client';
import type {
  CreateExportByTypeAndMissionPartnerIdMutation,
  CreateExportByTypeAndMissionPartnerIdMutationVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useCreateExportsByTypeAndMissionPartnerId = () => {
  const mutation = gql`
    mutation CreateExportByTypeAndMissionPartnerId(
      $downloadType: String!
      $missionPartnerId: String!
    ) {
      createExportByTypeAndMissionPartnerId(
        downloadType: $downloadType
        missionPartnerId: $missionPartnerId
      ) {
        id
        userId
        type
        requestedAt
        completedAt
        title
        parameters
        status
        error
      }
    }
  `;

  const [createExportByTypeAndMissionPartnerId, { loading, error, data }] =
    useMutation<
      CreateExportByTypeAndMissionPartnerIdMutation,
      CreateExportByTypeAndMissionPartnerIdMutationVariables
    >(mutation);

  return useMemo(() => {
    return {
      createExportByTypeAndMissionPartnerId: async (
        downloadType: string,
        missionPartnerId: string
      ) =>
        createExportByTypeAndMissionPartnerId({
          variables: {
            downloadType,
            missionPartnerId
          }
        }),
      createExportByTypeAndMissionPartnerIdLoading: loading,
      createExportByTypeAndMissionPartnerIdError: error,
      createExportByTypeAndMissionPartnerIdData:
        data?.createExportByTypeAndMissionPartnerId || null
    };
  }, [createExportByTypeAndMissionPartnerId, loading, error, data]);
};
