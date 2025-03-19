import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { FIND_ALL_HOSTED_VENDORS_QUERY } from './queries/FIND_ALL_HOSTED_VENDORS_QUERY';

export const useFindAllHostedVendors = options => {
  const { loading, error, data, refetch } = useQuery(
    FIND_ALL_HOSTED_VENDORS_QUERY,
    {
      fetchPolicy: 'network-only',
      ...options
    }
  );
  const useRefetch = () => {
    refetch();
  };

  const results = useMemo(() => {
    return (
      data?.findAllHostedVendors?.map(vendor => ({
        ...vendor,
        totalItems:
          vendor.courses.length + vendor.exams.length + vendor.scorms.length
      })) || []
    );
  }, [data]);

  return {
    allHostedVendorsLoading: loading,
    allHostedVendorsError: error,
    allHostedVendors: results,
    useAllHostedVendors: useRefetch
  };
};
