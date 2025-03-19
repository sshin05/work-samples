import { gql, useMutation } from '@apollo/client';
import type {
  ExportLicensesMutation,
  ExportLicensesMutationVariables
} from '@/api/codegen/graphql';

export const useExportLicenses = () => {
  const mutation = gql`
    mutation ExportLicenses {
      exportLicenses
    }
  `;
  const [exportLicenses, { loading, error }] = useMutation<
    ExportLicensesMutation,
    ExportLicensesMutationVariables
  >(mutation);
  return {
    exportLicenses,
    exportLicensesLoading: loading,
    exportLicensesError: error
  };
};
