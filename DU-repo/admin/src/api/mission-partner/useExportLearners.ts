import { gql, useLazyQuery } from '@apollo/client';
import type {
  ExportLearnersQuery,
  ExportLearnersQueryVariables
} from '@/api/codegen/graphql';

export const useExportLearners = () => {
  const query = gql`
    query ExportLearners($missionPartnerId: ID!, $missionPartnerName: String) {
      exportLearners(
        missionPartnerId: $missionPartnerId
        missionPartnerName: $missionPartnerName
      ) {
        id
      }
    }
  `;
  const [exportLearners, { loading, error, data }] = useLazyQuery<
    ExportLearnersQuery,
    ExportLearnersQueryVariables
  >(query, {
    fetchPolicy: 'network-only'
  });
  return {
    exportLearners,
    exportLearnersLoading: loading,
    exportLearnersError: error,
    exportLearnersData: data?.exportLearners || null
  };
};
